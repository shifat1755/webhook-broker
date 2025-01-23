import { addWebhookToRedis } from "../services/webhook.service";
import { Request, Response } from "express";


export const addWebHook = async (req: Request, res: Response):Promise<any> => {
  console.log("Request body:", req.body);

  try {
    console.log("Request body:", req.body);
    await addWebhookToRedis(req.body.eventName, req.body.webhookUrl);
    return res.status(200).json({
      message: `WebhookUrl for event "${req.body.eventName}" added successfully!`,
    });
  } catch (err) {
    console.error("Error adding webhook:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const getWebHooks = async (req: Request, res: Response):Promise<any> => {
return null;
}
export const triggerEvent = async (req: Request, res: Response):Promise<any> => {
  return null;
}
export const getSpecificWebHook = async (req: Request, res: Response):Promise<any> => {
  return null;
}