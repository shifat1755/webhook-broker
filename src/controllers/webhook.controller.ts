import { addWebhookToRedis,getOneWebhookFromRedis } from "../services/webhook.service";
import { Request, Response } from "express";


export const addWebHook = async (req: Request, res: Response):Promise<any> => {
  try {
    await addWebhookToRedis(req.body.eventName, req.body.webhookUrl);
    return res.status(200).json(req.body);
  } catch (err) {
    console.error("Error adding webhook:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const getWebHooks = async (req: Request, res: Response):Promise<any> => {
  // try{
  //   const response=await
  // }
  return null;
}
export const triggerEvent = async (req: Request, res: Response):Promise<any> => {
  return null;
}

export const getSpecificWebHook = async (req: Request, res: Response):Promise<any> => {
  try{
    const response=await getOneWebhookFromRedis(req.params.eventName);
    return res.status(200).json(response);
  }catch(err){
    console.error("Error getting webhook:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}