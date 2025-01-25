import { addToQueue } from "../messageBroker/queue";
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
  const eventName = req.params.eventName;
  const payload = req.body;
  try{
    const response=await getOneWebhookFromRedis(eventName);
    const webhookUrls = response?.webhookUrls;
    await addToQueue(webhookUrls, payload);
    return res.status(200).json({
      message: "Event triggered successfully",
    });
  }
  catch(err){
    console.error("Error triggering event:", err);
    return res.status(500).json({
      message: "Internal server error",

})}
};

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