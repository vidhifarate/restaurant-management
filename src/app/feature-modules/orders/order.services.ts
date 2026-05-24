import orderRepo from "./order.repo.js";
import { OrderResponses } from "./order.responses.js";
import type { Order } from "./order.types.js";

const addOrder= async(order:Omit<Order,"id">)=>{
  try{
    await orderRepo.create(order);
    return OrderResponses.ORDER_CREATED
  } catch (error) {
    throw OrderResponses.ORDER_FAILED; 
  }
}

const search= async(order:Partial<Order>)=>{
  try{
    const orders = await orderRepo.findAll(order);
    return orders;
  }catch(e){
    throw OrderResponses.ORDER_NOT_FOUND;
  }
}

export default {
  addOrder,
  search,

}