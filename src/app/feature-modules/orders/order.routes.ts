import { Router } from "express";
import orderServices from "./order.services.js";
import { Route } from "../../routes/routes.types.js";
import { ResponseHandler } from "../../../utilities/response-handler.js";

const router = Router();

router.post("/add",async(req,res,next)=>{
  try{
    const result = await orderServices.addOrder(req.body);
    res.send(result);
  }catch(e){
    new ResponseHandler(null,e)
  }
});


router.get("/search",async(req,res,next)=>{
  try{
    const query = req.query;
    const result = await orderServices.search(query);
    res.send(result);
  }catch(e){
    new ResponseHandler(null,e)
  }
})

export default new Route("/orders",router)