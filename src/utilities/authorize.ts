// import type { NextFunction, Request, Response } from "express"
// import type { string } from "zod";
// import tokens, { verifyToken } from "./tokens.js";
// import { tokenBlacklist } from "./blacklisted.js";
// import type { User } from "../app/feature-modules/users/user.types.js";


// // const roles: { [key: string]: string[] } = {
// //   admin: ['add-restaurant-owner', 'delete-restaurant-owner', 'update-restaurant-owner', 'find-restaurant', 'find-restaurant-owner'],
// //   restaurantOwner: ['add-restaurant', 'add-branch', 'delete-staff', 'update-staff', 'view-menu', 'view-orders', 'update-menu', 'update-orders'],
// //   manager: ['add-staff', 'delete-staff', 'update-staff', 'view-menu', 'view-orders', 'update-menu', 'update-orders','add-user'],
// //   kitchenStaff: ['view-menu'],
// //   serviceStaff: ['view-menu', 'view-orders', 'update-order-status']
// // }

// // const authorize = (user:User,role: string) => (req: Request, res: Response, next: NextFunction) => {
// //   try {
// //     if (req.cookies){
// //     const token = req.cookies["accessToken"];
// //     // console.log("in check roleeeeeeee 222222 2")
// //     // console.log(token);
// //     // console.log("in check role 22 ")
// //     const decoded = verifyToken(token as string);
// //     // console.log(decoded);
// //     const userRole = decoded.payload.role;

// //   if(tokenBlacklist.includes(token))return'INVALID TOKEN ';
// //     if (decoded.payload.version!==userRole.version)return'INVALID TOKEN ';

// //     if (roles.userRole && roles[userRole]?.includes(role)) {
// //       next();
// //     }
// //     else {
// //       res.status(403).send({ message:"unauthorized access" });
// //     }
// //   }else{
// //         const header = req.headers.authorization;
// //           const token = header?.split(" ")[1] as string;
// //           const decoded= verifyToken(token);
// //           req.body=(req.body,decoded);
// //           next();

// //     }
    
// //   } catch (e) {
// //     console.log(e)
// //     res.status(401).send({ message: "invalid token" });
// //   }

// // }

// const authorize=(...allowedRoles:string[])=>{
// (req:Request,res:Response,next:NextFunction)=>{
//   try{
//     let token:string;
//     if(req.cookies){
//        token= req.cookies["accessToken"];
//     }else {
//       const header = req.headers.authorization;
//        token = header?.split(" ")[1] as string;
//     }
//     const decoded= verifyToken(token);
//     req.body=(req.body,decoded);
//     const userRole=decoded.payload.role;
//     if(tokenBlacklist.includes(token))return'INVALID TOKEN ';
//     if (allowedRoles.includes(userRole)) {
//       next();
//     }
//     else {
//       res.status(403).send({ message:"unauthorized access" });
//     } 

//   }catch(e){
//     console.log(e)
//     res.status(401).send({ message: "invalid token" });
//   }
// }}


// export default authorize
import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "./tokens.js";
import { tokenBlacklist } from "./blacklisted.js";
import { Users } from "../app/feature-modules/users/user.schemas.js";
import { Roles } from "../app/feature-modules/roles/roles.schema.js";
import { Permissions } from "../app/feature-modules/permissions/permission.schemas.js";

/**
 * Middleware protecting endpoints by checking if the authenticated user
 * has the required fine-grained permission string registered in the database.
 */
const authorize = (requiredPermission: string) => {
  // FIXED: Explicitly return the middleware closure function back to the Express router
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string | undefined;
      
      if (req.cookies && req.cookies["accessToken"]) {
        token = req.cookies["accessToken"];
      } else {
        const header = req.headers.authorization;
        token = header?.split(" ")[1];
      }

      if (!token) {
        return res.status(401).send({ message: "Access token missing" });
      }

      if (tokenBlacklist.includes(token)) {
        return res.status(401).send({ message: "Token is blacklisted" });
      }

      const decoded = verifyToken(token);
      
      // Look up user from DB, including their Role and associated fine-grained Permissions
      const userWithPermissions = await Users.findOne({
        where: { id: decoded.payload.id },
        include: [
          {
            model: Roles,
            as: "role",
            include: [
              {
                model: Permissions,
                through: { attributes: [] } // Exclude join table metadata from response
              }
            ]
          }
        ]
      });

      if (!userWithPermissions || !userWithPermissions.role) {
        return res.status(403).send({ message: "Unauthorized access: user context invalid" });
      }

      // Security check: Verify token lifecycle versions match
      if (decoded.payload.version !== userWithPermissions.version) {
        return res.status(401).send({ message: "Token version mismatch, please re-authenticate" });
      }

      // Extract raw text permission identifier strings from joined association records
      const assignedPermissions = (userWithPermissions.role as any).Permissions.map(
        (perm: any) => perm.name
      );

      // Evaluate system authorization condition against database-backed entries
      if (assignedPermissions.includes(requiredPermission)) {
        // Safe context attachment path: attach profile object data onto request elements cleanly
        (req as any).user = {
          id: userWithPermissions.id,
          role: userWithPermissions.role,
          restaurant_id: userWithPermissions.restaurant_id,
          branch_id: userWithPermissions.branch_id
        };
        return next();
      } else {
        return res.status(403).send({ message: "Unauthorized access: privilege tier insufficient" });
      }

    } catch (e) {
      console.error("Authorization Pipeline Exception: ", e);
      return res.status(401).send({ message: "Invalid or expired authorization signature" });
    }
  };
};

export default authorize;