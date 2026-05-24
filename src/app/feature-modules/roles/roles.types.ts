import z from "zod";

export const ZRole = z.object({
  id :z.string(),
  role:z.string(),
  restaurant_id:z.string(),
  branch_id:z.string()
});

export type Role=z.infer<typeof ZRole >;