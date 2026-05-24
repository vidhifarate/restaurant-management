import { Router } from "express";
import checkRole from "../../../utilities/authorize.js";

import menueServices from "./menu.services.js";
import { Route } from "../../routes/routes.types.js";
import { uploadMenu } from "../../../utilities/multer-middleware.js";
import { ResponseHandler } from "../../../utilities/response-handler.js";
import menuRepo from "./menu.repo.js";

const router = Router()


router.post("/add", uploadMenu.array('menu', 5), async (req, res, next) => {
  try {
    const result = await menueServices.addMenue(req.body);
    res.send(result);
  }
  catch (e) {
    new ResponseHandler(null,e)
  }
});


router.get("/search", async (req, res, next) => {
  try {
    const result = await menueServices.search(req.body);
    res.send(result);
  } catch (e) {
    new ResponseHandler(null,e)
  }
});



router.delete("/delete", async (req, res, next) => {
  try {
    const result = await menueServices.deleteMenue(req.body);
    res.send(result);
  } catch (e) {
    new ResponseHandler(null,e)
  }
});

// router.put("/edit",async(req,res,next)=>{
//   try{
//     const userExists= await menuRepo.findByID(req.body);
//     if(!userExists) throw new Error("menue not found");

//     await menuRepo.update(req.body.id, req.body);
//     return { message: "Menu updated successfully" };
//   }catch(e){
//      new ResponseHandler(null,e)

//   }
// })





export default new Route("/menu", router);
