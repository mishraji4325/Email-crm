import { Queue } from "bullmq";
import {connection} from '../lib/redis.js';

export const followupQueue = new Queue(
    "followup",
    {
        connection
    }
);