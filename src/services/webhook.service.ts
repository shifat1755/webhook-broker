import { redisClient } from "../config/redisClient.config";
export const triggerEvent = async (event: string) => {
    return null;
}

export const addWebhookToRedis = async (eventName: string, webHookUrl: string) => {
    try {
      const key = `event:${eventName}`;
        await redisClient.rpush(key, webHookUrl);
      console.log(`Webhooks for event "${eventName}" added successfully!`);
    } catch (err) {
      console.error(`Error adding webhooks for event "${eventName}":`, err);
    }
  };