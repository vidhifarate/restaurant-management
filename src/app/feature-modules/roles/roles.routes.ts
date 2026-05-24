import { Router } from "express";
import rolesRepo from "./roles.repo.js";
import { ResponseHandler } from "../../../utilities/response-handler.js";
import { RoleResponses } from "./roles.responses.js";

const router = Router();

router.get('/search',async(req,res,next)=>{
  try{
    const query=req.query;
    const result= await rolesRepo.findAll(query);
    res.send( new ResponseHandler(result, null));

  }catch(e){
   throw RoleResponses.ROLE_NOT_FOUND;

  }

})