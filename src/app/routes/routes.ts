import { json, type Application, type NextFunction, type Request, type Response } from "express";
import { routes } from "./routes.data.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { ResponseHandler } from "../../utilities/response-handler.js";


export const registerMiddleware=(app:Application)=>{
  app.use(helmet());
  app.use(json());
  app.use(cookieParser());
  for(const route of routes){
    app.use(route.path,route.router);
  }

  app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    // res.status(err.statusCode).send(new ResponseHandler(null,err));
     const statusCode = typeof err.statusCode === "number"?err.statusCode:500;
    res.status(statusCode).send(new ResponseHandler(null,err));

  })
}


