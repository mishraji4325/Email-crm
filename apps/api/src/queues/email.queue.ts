import { Queue } from "bullmq";

import IORedis from "ioredis";

const connection =
    new IORedis(
        process.env.REDIS_URL!,{
            maxRetriesPerRequest: null,
  enableReadyCheck: false,
        }
    );
    console.log("🚀 ~  process.env.REDIS_URL:",  process.env.REDIS_URL)

export const emailQueue =
    new Queue(
        "email-generator",
        {
            connection
        }
    );