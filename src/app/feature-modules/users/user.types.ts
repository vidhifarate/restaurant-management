

import z from "zod";

export const Zuser = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["admin", "restaurantOwner", "manager", "kitchenStaff", "serviceStaff"]),
  restaurant_id: z.string().uuid(),
  branch_id: z.string().uuid(),
  profile_picture:z.string().optional(),
  version:z.coerce.number()

});

export type User = z.infer<typeof Zuser>;
