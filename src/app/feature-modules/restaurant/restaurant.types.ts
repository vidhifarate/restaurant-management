import z from "zod";

export const Zrestaurant=z.object({
  id:z.string().optional(),
  name:z.string().min(1),
  location:z.string().min(1),
  owner_id:z.string().uuid(),
  revenue:z.coerce.number(),
  profit:z.coerce.number(),
  expenses:z.coerce.number()

})

 const ZRestaurantCreate=Zrestaurant.omit({id:true});

export type Restaurant=z.infer<typeof Zrestaurant>;


export default {ZRestaurantCreate}