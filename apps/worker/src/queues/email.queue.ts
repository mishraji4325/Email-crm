import {Queue} from 'bullmq';
import IORedis from 'ioredis';
import {connection} from '../lib/redis.js';

export const emailQueue = new Queue('email-generator',{
    connection,
});