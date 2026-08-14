import { Worker } from "bullmq";
import { connection } from "../lib/redis";
import { prisma } from "../lib/prisma";

new Worker(
  "followup",
  async (job) => {
    try {
      console.log("Running follow-up job...");
      console.log("Job data:", job.data);

      const { leadId } = job.data;

      if (!leadId) {
        console.log("No leadId found in follow-up job");
        return;
      }

      await prisma.activity.create({
        data: {
          type: "FOLLOWUP_SENT",
          description: "Follow-up email sent",
          leadId,
        },
      });

      console.log("Follow-up activity created");
    } catch (error) {
      console.error("FOLLOWUP WORKER ERROR:", error);
    }
  },
  {
    connection,
  }
);

console.log("Follow-up worker running...");