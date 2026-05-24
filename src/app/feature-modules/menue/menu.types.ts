import {z} from "zod"
export const Zmenue=z.object({
  id:z.string().optional(),
  name:z.string().min(1),
  price:z.number(),
  tag:z.enum(["veg","non-veg"]),
  restaurant_id:z.string(),
  branch_id:z.string(),
  pictures:z.string(),
  ingredients:z.string().optional(),
  discription:z.string().optional(),
  is_liqor:z.boolean(),
  spiceLevel:z.enum(["mild","medium","high"]),
  calories:z.number().optional()
});

export type Menue=z.infer<typeof Zmenue>;


