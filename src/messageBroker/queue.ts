import { Queue } from 'bullmq';

export const taskQueue = new Queue('taskQueue', {
    connection: {
        host: "localhost",
        port: 6397
    },
    defaultJobOptions: {
        attempts: 10,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    }
});

export const failedQueue = new Queue('failedNotification', {
    connection: {
        host: "localhost",
        port: 6397
    }
});

export const addToQueue =async (urls:any, payload: any) => {
    console.log("payload:",payload);
    for (const url of urls) {
        console.log(`Adding URL: ${url}`);
        const task = {
            url,
            payload
        };
        taskQueue.add('task', task);
    }
    const jobCount =await taskQueue.getJobCounts();
    console.log('Number of jobs in the queue:', jobCount);
}