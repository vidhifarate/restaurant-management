import { fi } from "zod/locales";
import restaurantRepo from "./restaurant.repo.js";

import { executionAsyncId } from "async_hooks";
import type { Restaurant } from "./restaurant.types.js";
import type { Menue } from "../menue/menu.types.js";
import { RestaurantResponses } from "./restaurant.responses.js";

 const addRestaurant=async(restaurant:Omit<Restaurant,"id">)=>{
  try{
    await restaurantRepo.create(restaurant);
    return RestaurantResponses.RESTAURANT_CREATED;
  }catch(e){
    throw RestaurantResponses.RESTAURANT_CREATION_FAILED;
  }
}

 const search=(restaurant:string)=>{
  try{
    const result =  restaurantRepo.findAll(restaurant);
    return result
  }catch(e){
    throw RestaurantResponses.RESTAURANT_NOT_FOUND;
  }
}

export const filter = async (filter:Partial<Restaurant>)=>{  
  try{
    if(filter.location){
      const result = await restaurantRepo.findAll(filter.location);
      return result;
    }else if(filter.owner_id){
      const result = await restaurantRepo.findAll(filter.owner_id);
      return result;
    }
  }catch(e){
    throw RestaurantResponses.RESTAURANT_NOT_FOUND;
  }
}

export default {
  addRestaurant,
  search,
  filter

}

