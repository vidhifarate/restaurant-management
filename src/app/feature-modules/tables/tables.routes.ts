import { Router } from "express";
import { ResponseHandler } from "../../../utilities/response-handler.js";
import tableServices from "./table.services.js";

const router = Router();

router.get("/add",async(req,res,next)=>{
  try{
    const result = await tableServices.addTable(req.body);
    res.send(new ResponseHandler(result, null));
  }catch(e){
    throw e;
  }
})

router.get("/search",async(req,res,next)=>{
  try{
    const query=req.query;
    console.log(query);
   const result = await tableServices.search(query);
    res.send(new ResponseHandler(result, null));
  }catch(e){
    throw e;
  }
});

