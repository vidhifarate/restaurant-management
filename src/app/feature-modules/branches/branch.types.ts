import z from "zod";
export const Zbranch=z.object({
  id:z.string().optional(),
  name:z.string().min(1),
  location:z.string().min(1),
  owner_id:z.string().min(1),
  revenue:z.number(),
  profit:z.number(),
  expenses:z.number(),
  restaurant_id:z.string().min(1),
  tag:z.enum(["veg", "non-veg", "both"]),
  category:z.enum(["luxury", "budget"]) 
})

export type Branch=z.infer<typeof Zbranch>; 