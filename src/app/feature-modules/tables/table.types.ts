import z from "zod";

export const Ztable=z.object({
  id:z.string().optional(),
  table_no:z.number(),
  capacity:z.number(),
  restaurant_id:z.string(),
  branch_id:z.string(),
  waiter_id:z.string(),
  status:z.enum(["available","reserved","occupied"])
})

export type Table = z.infer<typeof Ztable>;