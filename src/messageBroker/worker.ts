import { Worker, Job } from 'bullmq';
import { taskQueue, failedQueue } from './queue';
import axios from 'axios';

export const worker = new Worker('taskQueue', async (job: Job) => {
    const { url, payload } = job.data;
    console.log(`Sending payload to ${url}:`, payload);

    try {
        // const res = await axios.get('http://localhost:3000');
        const res= await axios.post(url, payload);
        console.log("response:", res.data);
    } catch (err) {
        console.error("Error sending payload:", err);
        throw err;
    }
},{connection: {
    host: "localhost",
    port: 6397
}});



worker.on("failed", async (job, err) => {
    if (job) {
        if (job.attemptsMade > 10) {
            await failedQueue.add("failedPost", job.data);
        }
    }
});
