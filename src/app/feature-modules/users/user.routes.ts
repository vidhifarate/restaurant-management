import { Router } from "express";
import { body } from "../../../utilities/validate.js";
import { ZuserCreate } from "../auth/auth.types.js";
import userServices, { sendMail } from "./user.services.js";
import { Route } from "../../routes/routes.types.js";
import checkRole from "../../../utilities/authorize.js";
import { ResponseHandler } from "../../../utilities/response-handler.js";
import {upload} from "../../../utilities/multer-middleware.js";
import { th } from "zod/locales";
import type { User } from "./user.types.js";




const router = Router();



router.post("/add",upload.single('profile_picture') ,body(ZuserCreate)  ,async (req, res, next) => {
  try {
  
    const userPassword = req.body.password;
    const result = await userServices.createUser(req.body);
    
    const userMail = req.body.email;
    
    sendMail(userMail, userPassword);

   res.send(new ResponseHandler(result,null));
  } catch (error) {
    next(error);
  }
});

router.get("/get-service-staff" ,async (req, res, next) => {
  try {
    const result = await userServices.findAllByRole("serviceStaff");
  res.send(new ResponseHandler(result, null));
} catch (e) {
  throw e ;
}
});


// router.get("/get-users",checkRole("get-users"),async(req,res,next)=>{
//   try{
//     const result = await userServices.getAllUsers();
//   res.send(new ResponseHandler(result, null));
// }catch(e){
//   throw e ;
// }
// });

router.post ("/upload-profilePicture",upload.single("profilePicture"),async(req,res,next)=>{
  try{
    res.send({success:true,file:req.file})
  }catch(e){
    throw e ;
  }
});


router.get("/search",async(req,res,next)=>{
  try{
    const query=req.query.name ;
   const result = await userServices.searchByName(query as string);
  res.send(new ResponseHandler(result));
  }catch(e){
    throw e;
  }
});


router.get("/filter", async (req, res, next) => {
  try{
    const query = req.query;
    const result = await userServices.filter(query);
    res.send(new ResponseHandler(result));

  }catch(e){
  throw e;
  }
});

router.get('/sort',async(req,res,next)=>{
  try{
    const query = req.query
    const result = await userServices.sort(query);
    res.send(new ResponseHandler(result))

  }catch(e){

  }

})


export default new Route("/users",router)

// router.post("/add-staff", body(ZuserCreate), checkRole("add-staff"), async (req, res, next) => {
//   try {
//     console.log("in add user route")
//     const result = await userServices.create(req.body);
//   res.send(new ResponseHandler(result, null));
// } catch (e) {

//   throw e ;
// }
// });

// router.post("/add-restaurantOwner", body(ZuserCreate), checkRole("add-restauranOwner"), async (req, res, next) => {
//   try {
//     console.log("in add user route")
//     const result = await userServices.createUser(req.body);
//   res.send(new ResponseHandler(result, null));
  
// } catch (e) {
//   throw e;
// }
// });


// router.post("/add-admin", body(ZuserCreate), checkRole("add-admin"), async (req, res, next) => {
//   try {
//     console.log("in add user route")
//     const result = await userServices.createUser(req.body);
    
//   res.send(new ResponseHandler(result, null));
// } catch (e) {
//   throw e ;
// }
// }); 



