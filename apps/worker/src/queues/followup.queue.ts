import { Queue } from "bullmq";
import {connection} from '../lib/redis';

export const followupQueue = new Queue(
    "followup",
    {
        connection
    }
);