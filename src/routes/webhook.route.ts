import express from 'express';
import {addWebHook,getWebHooks,triggerEvent,getSpecificWebHook}  from '../controllers/webhook.controller';

const router = express.Router();

router.post('/api/v0/webhooks', addWebHook);
router.get('/api/v0/webhooks/', getWebHooks);
router.get('/api/v0/webhooks/:eventName', getSpecificWebHook);
router.post('/api/v0/trigger-event/:eventName',triggerEvent);
export default router;
