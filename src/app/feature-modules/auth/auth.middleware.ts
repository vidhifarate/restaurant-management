import type { NextFunction, Request, Response } from "express";

import { verifyToken } from "../../../utilities/tokens.js";

export const authenticate =(req:Request,res:Response,next:NextFunction)=>{
  const header = req.headers.authorization;
  const token = header?.split(" ")[1] as string;
  const decoded= verifyToken(token);
  req.body=(req.body,decoded);
  next();

};

export default{authenticate};



