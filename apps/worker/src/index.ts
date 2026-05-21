import { Worker } from 'bullmq';
import { connection } from './lib/redis';
import testRoutes from './routes/test.route';
import generateRoutes from './routes/generate.route';
import express from 'express';
import { prisma } from './lib/prisma';
import { generateEmail } from './services/openAI.service';


const app = express();

app.use(express.json());

const worker = new Worker(

    "email-generator",

    async (job) => {

        try {

            console.log("JOB RECEIVED");

            const { leadId } = job.data;

            console.log(
                "Lead id:",
                leadId
            );

            const lead =
                await prisma.lead.findUnique({

                    where: {
                        id: leadId
                    }

                });

            console.log(
                "Lead found:"
            );

            console.log(lead);

            if (!lead) {

                console.log(
                    "Lead not found"
                );

                return;
            }

            console.log(
                "Generating email..."
            );

            const email =
                await generateEmail(
                    lead
                );

            console.log(
                "EMAIL GENERATED:"
            );

            console.log(
                email
            );

        } catch (error) {

            console.log(
                "WORKER ERROR:"
            );

            console.log(error);

        }

    },

    {
        connection
    }

);

app.use('/', testRoutes);
app.use('/generate', generateRoutes);


app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

// console.log(process.env.REDIS_URL);
console.log('Worker is running...');