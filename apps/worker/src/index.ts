    import { Worker } from "bullmq";
    import express from "express";
    import { createServer } from "http";
    import { connection } from "./lib/redis.js";
    import { getIO, initializeSocket } from "./lib/socket.js";
    import testRoutes from "./routes/test.route.js";
    import generateRoutes from "./routes/generate.route.js";
    import { prisma } from "./lib/prisma.js";
    import { generateEmail} from "./services/AnthropicAI.service.js";
    import { humanizeEmail } from "./services/humanizer.service.js";
    import { sendEmail } from "./services/resend.service.js";
    import { getTemplateVariant, buildPrompt } from "./services/template.service.js";
    import { followupQueue } from "./queues/followup.queue.js";

    const app = express();

    app.use(express.json());

    const worker = new Worker(
        "email-generator",
        async (job) => {
          try {
            // GENERATE EMAIL
            if (job.name === "generate") {
              const { leadId } = job.data;
      
              console.log("Lead ID:", leadId);
      
              const lead = await prisma.lead.findUnique({
                where: {
                  id: leadId,
                },
              });
      
              console.log("Lead fetched");
      
              if (!lead) {
                console.log("Lead not found");
                return;
              }
      
              console.log("Generating email...");
      
              const variant = getTemplateVariant();
              console.log("🚀 ~ variant:", variant);
      
              const prompt = buildPrompt(lead, variant);
      
              const rawEmail = await generateEmail(lead, prompt);
              if (!rawEmail) {
                console.log("Email generation returned empty result");
                return;
              }
      
              // console.log("RAW EMAIL:");
              // console.log(rawEmail);
              // console.log("Humanizing...");
      
              const finalEmail = await humanizeEmail(rawEmail);
      
              // console.log("HUMANIZED:");
              // console.log(finalEmail);
              // console.log("Saving to DB...");
      
              await prisma.email.create({
                data: {
                  subject: "Quick Idea",
                  body: finalEmail,
                  variant,
                  rawOutput: rawEmail,
                  humanizedOutput: finalEmail,
                  leadId: lead.id,
                },
              });
      
              console.log("EMAIL SAVED");
      
              await prisma.activity.create({
                data: {
                  type: "Email Generated",
                  description: "AI email generated",
                  leadId: lead.id,
                },
              });
      
              getIO().emit("email generated", {
                leadId: lead.id,
                message: "Email generated",
              });
      
              console.log("Activity created");
            }
      
            // SEND EMAIL
            if (job.name === "send-email") {
              const email = await prisma.email.findUnique({
                where: {
                  id: job.data.emailId,
                },
                include: {
                  lead: true,
                },
              });
      
              if (!email) {
                console.log("Email not found");
                return;
              }
      
              await sendEmail({
                to: email.lead.emails,
                subject: email.subject || "Quick idea",
                html: `
                  ${email.humanizedOutput}
                  <img
                    src="http://localhost:5000/track/${email.id}"
                    width="1"
                    height="1"
                  />
                `,
              });
      
              console.log("EMAIL SENT");
      
              await followupQueue.add(
                "followup",
                {
                  leadId: email.leadId,
                //   sequenceId: email.sequenceId,
                  stepNumber: 2,
                },
                {
                  delay: 3 * 24 * 60 * 60 * 1000,
                }
              );
      
              await prisma.activity.create({
                data: {
                  type: "Email sent",
                  description: "Email sent to lead",
                  leadId: email.leadId,
                },
              });
      
              await prisma.email.update({
                where: {
                  id: email.id,
                },
                data: {
                  isDraft: false,
                },
              });
            }
          } catch (error) {
            console.log("WORKER ERROR:");
            console.log(error);
          }
        },
        {
          connection,
        }
      );
      
      app.use("/", testRoutes);
      app.use("/generate", generateRoutes);
      
      const httpServer = createServer(app);
      
      initializeSocket(httpServer);
      
      httpServer.listen(5001, () => {
        console.log("Server running on 5001");
      });
      
      console.log("Worker running...");