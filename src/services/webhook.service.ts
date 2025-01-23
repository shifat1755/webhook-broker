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

export const getOneWebhookFromRedis = async (eventName: string) => {
    try {
      const key = `event:${eventName}`;
      const webhookUrls = await redisClient.lrange(key, 0, -1);
      console.log(webhookUrls);
      return {
        eventName,
        webhookUrls
    };
    } catch (err) {
      console.error(`Error getting webhooks for event "${eventName}":`, err);
    }
  };
  
export const getWebhooksFromRedis = async (page_size:number,offset:number):Promise<any> => {
    try {
        const keys = await redisClient.keys('event:*');
        const webhooks = await Promise.all(keys.map(async (key) => {
          const eventName = key.split(':')[1];
          const webhookUrls = await redisClient.lrange(key, 0, -1);
          return {
            eventName,
            webhookUrls
          };
        }));
        return webhooks;
      } catch (err) {
        console.error("Error getting webhooks:", err);
      }
}
