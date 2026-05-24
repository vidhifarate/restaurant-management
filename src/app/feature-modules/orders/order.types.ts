import z from "zod";


export const Zorder =z.object({
  id:z.string(),
  table_number:z.number(),
  quantity:z.number(),
  name:z.string().min(1),
  branch_id:z.string(),
  waiter_assigned:z.string(),
  total:z.number(),
  tax:z.number(),
  grand_Total:z.number()

})

export type Order = z.infer<typeof Zorder>

