import { Orders } from "./order.schemas.js";
import type { Order } from "./order.types.js";

const create = (order:Omit<Order,"id">)=> Orders.create(order);
const findOne = (order:Partial<Order>)=> Orders.findOne({where:order});
const findAll = (order:Partial<Order>)=> Orders.findAll({where:order});

export default {
  create,
  findOne,
  findAll
}