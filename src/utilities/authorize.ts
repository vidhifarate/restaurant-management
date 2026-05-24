import type { NextFunction, Request, Response } from "express"
import type { string } from "zod";
import tokens, { verifyToken } from "./tokens.js";
import { tokenBlacklist } from "./blacklisted.js";
import type { User } from "../app/feature-modules/users/user.types.js";


// const roles: { [key: string]: string[] } = {
//   admin: ['add-restaurant-owner', 'delete-restaurant-owner', 'update-restaurant-owner', 'find-restaurant', 'find-restaurant-owner'],
//   restaurantOwner: ['add-restaurant', 'add-branch', 'delete-staff', 'update-staff', 'view-menu', 'view-orders', 'update-menu', 'update-orders'],
//   manager: ['add-staff', 'delete-staff', 'update-staff', 'view-menu', 'view-orders', 'update-menu', 'update-orders','add-user'],
//   kitchenStaff: ['view-menu'],
//   serviceStaff: ['view-menu', 'view-orders', 'update-order-status']
// }

// const authorize = (user:User,role: string) => (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (req.cookies){
//     const token = req.cookies["accessToken"];
//     // console.log("in check roleeeeeeee 222222 2")
//     // console.log(token);
//     // console.log("in check role 22 ")
//     const decoded = verifyToken(token as string);
//     // console.log(decoded);
//     const userRole = decoded.payload.role;

//   if(tokenBlacklist.includes(token))return'INVALID TOKEN ';
//     if (decoded.payload.version!==userRole.version)return'INVALID TOKEN ';

//     if (roles.userRole && roles[userRole]?.includes(role)) {
//       next();
//     }
//     else {
//       res.status(403).send({ message:"unauthorized access" });
//     }
//   }else{
//         const header = req.headers.authorization;
//           const token = header?.split(" ")[1] as string;
//           const decoded= verifyToken(token);
//           req.body=(req.body,decoded);
//           next();

//     }
    
//   } catch (e) {
//     console.log(e)
//     res.status(401).send({ message: "invalid token" });
//   }

// }

const authorize=(...allowedRoles:string[])=>{
(req:Request,res:Response,next:NextFunction)=>{
  try{
    let token:string;
    if(req.cookies){
       token= req.cookies["accessToken"];
    }else {
      const header = req.headers.authorization;
       token = header?.split(" ")[1] as string;
    }
    const decoded= verifyToken(token);
    req.body=(req.body,decoded);
    const userRole=decoded.payload.role;
    if(tokenBlacklist.includes(token))return'INVALID TOKEN ';
    if (allowedRoles.includes(userRole)) {
      next();
    }
    else {
      res.status(403).send({ message:"unauthorized access" });
    } 

  }catch(e){
    console.log(e)
    res.status(401).send({ message: "invalid token" });
  }
}}


export default authorize