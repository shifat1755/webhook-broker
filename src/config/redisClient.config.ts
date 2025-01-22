import Redis from "ioredis";

export const redisClient = new Redis({
  host: process.env.redisHOST,
  port: 6397,
});

redisClient.on("connect", () => {
    console.log("Redis client connected successfully!");
  });
  

redisClient.on("error", (err) => {
console.error("Redis client connection error:", err);
});