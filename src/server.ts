import express from "express";
import dotenv from "dotenv";
import "./config/redisClient.config";
dotenv.config();


const app=express();
const PORT=process.env.PORT;

app.get("/",(req,res)=>{
    res.status(200).send("up and running like a Bee...");
});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});
