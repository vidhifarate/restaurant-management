import { Router } from "express";
import { body } from "../../../utilities/validate.js";
import { Zbranch } from "./branch.types.js";
import branchServices from "./branch.services.js";
import { Route } from "../../routes/routes.types.js";
import { ResponseHandler } from "../../../utilities/response-handler.js";

const router = Router();

router.post("/add",body(Zbranch),async(req,res,next)=>{
  try{

    const result = branchServices.addBranch(req.body);
  
    res.send(result);
  }catch(e){
     new ResponseHandler(null,e)
  }
});



router.delete("/delete",async(req,res,next)=>{
  try{

    const result= branchServices.deleteBranch(req.body);
    res.send(result)

  }catch(e){
     new ResponseHandler(null,e)
  }


});
router.get("/search",async(req,res,next)=>{
  try{    
    const result = await branchServices.search(req.body);
    res.send(result);
  }catch(e){
 new ResponseHandler(null,e)  }
});

router.put("/edit",async(req,res,next)=>{
  try{

  }catch(e){
     new ResponseHandler(null,e)
  }
})

export default new Route("/branches",router)
