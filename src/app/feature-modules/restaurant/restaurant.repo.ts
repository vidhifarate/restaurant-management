import { Restaurants } from "./restaurant.schemas.js";
import type { Restaurant } from "./restaurant.types.js";
import { Op } from "sequelize";




export const create =(restaurant:Omit<Restaurant,"id">)=> Restaurants.create(restaurant);
export const findOne=(restaurant:Partial<Restaurant>)=> Restaurants.findOne({where:restaurant})
export const findAllByRole=(role:string)=> Restaurants.findAll({attributes:[role]});

const findAll=(query:string)=> Restaurants.findAll({
  where:{
    name:{
      [Op.iLike]: `%${query}%`
    }}});



export default {
  create,
  findAll,
  findOne
}