import type { Application, Router } from "express";

export class Route{
  private static registeredRoutes:string[]=[]
  constructor(public path:string,
    public router :Router
  ){
    
    if(!path.startsWith("/"))throw"path should start with '/'";

    if(Route.registeredRoutes.includes(path))throw "path already registered"
    Route.registeredRoutes.push(this.path);


  }
}

export type Routes=Route[];