import express from "express"
import { connectToPG } from "./connections/pg.connections.js";
import { log } from "console";
import { env } from "../validate.env.js";
import { registerMiddleware } from "./routes/routes.js";

export const startServer=async()=>{
  try{
    const app = express();
    await connectToPG();
    registerMiddleware(app);


    app.listen(env.PORT,()=>{
      console.log(`serverr running at ${env.PORT} port `);
      
    });


  }catch(e){
    console.log("error",e);
    process.nextTick(()=>process.exit());

  }
}