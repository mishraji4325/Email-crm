import {Job, Worker} from 'bullmq';
import {connection} from '../lib/redis';
import { prisma } from '../lib/prisma';


new Worker('followup', async (job)=>{
    console.log('running follow up');
    console.log(job.data)
},
  {
    connection,
  }
)

await prisma.activity.create({

    data:{

        type:"FOLLOWUP_SENT",

        description:"Follow-up email sent",

        leadId: Job.data.leadId

    }

});