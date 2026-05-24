import  jwt from "jsonwebtoken";
import fs from "fs";

import type { User } from "../app/feature-modules/users/user.types.js";
import { tokenBlacklist } from "./blacklisted.js";




// type Payload=Pick<User,"email"|"role">

let currentVersion=1;


const privateKey = fs.readFileSync("private.key",'utf8');
const publicKey = fs.readFileSync("public.key",'utf8');

 export const generateAccessToken=async(role:string)=>{
  const token = await jwt.sign({version:currentVersion ,role},
    privateKey,
    {
      algorithm:"RS256",
      expiresIn:"60m"
  });
  return token;
}


 export const generateRefreshToken=async(role:string)=>{
   const token = await jwt.sign({version:currentVersion ,role},
    privateKey,
    {
      algorithm:"RS256",
      expiresIn:"7d"
  });
  return token;

}


 export const verifyToken=(token:string)=>{

  
  const decoded = jwt.verify(token,
    publicKey,{
      algorithms:["RS256"],
   complete:true
    }) as jwt.JwtPayload

    return decoded;

  
}



export const invalidateToken=(accessTokentoken:string,refreshToken:string)=>{
  tokenBlacklist.push(accessTokentoken);
  tokenBlacklist.push(refreshToken);
  
}

export default {
  verifyToken,generateAccessToken,generateRefreshToken,invalidateToken
}