import { Roles } from "./roles.schema.js";
import type { Role } from "./roles.types.js";

export const create =(role:Omit<Role,"id">)=> Roles.create(role);


export const findOne=(role:Partial<Role>)=> Roles.findOne({where:role});


export const findAllByRole=(role:string)=> Roles.findAll({attributes:[role]});

const findAll=(role:Partial<Role>)=> Roles.findAll({where:role});

export default {
  create,findOne,findAll,findAllByRole
}