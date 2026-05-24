import { Router } from "express";
import checkRole from "../../../utilities/authorize.js";
import restaurantServices from "./restaurant.services.js";
import { Route } from "../../routes/routes.types.js";
import { body } from "../../../utilities/validate.js";
import { Zrestaurant } from "./restaurant.types.js";
import { ResponseHandler } from "../../../utilities/response-handler.js";

const router = Router();

router.post("/add",body(Zrestaurant),async(req,res,next)=>{
  try{
    const result = await restaurantServices.addRestaurant(req.body);
    res.send(new ResponseHandler(result,null));
  }catch(e){
    console.log('error',e)
    throw e
  }
});


router.get("/search",async(req,res,next)=>{
  const result = restaurantServices.search(req.body);
  res.send(new ResponseHandler(result,null));
});

router.get("/filter", async (req, res, next) => {
  try{
    const query = req.query;
    const result = await restaurantServices.filter(query);
    res.send(result);

  }catch(e){
  throw e;
  }
});
router.get("/search",async(req,res,next)=>{
   try{
      const query=req.query.name ;
    
     const result = await restaurantServices.search(query as string);
     console.log(result);
      res.send(result);
    }catch(e){
      throw e;
    }
});


export default new Route("/restaurant",router)

// router.post('/add-restaurant-owner',checkRole('admin'),async(req,res,next)=>{
//   const result = restaurantServices.addRestaurantOwner(req.body);
//   res.send(new ResponseHandler(result,null));
// });