import { Zuser } from "../users/user.types.js";

export const ZuserCreate = Zuser.omit({id:true,restaurant_id:true,branch_id:true});
export const ZUserLogin = Zuser.pick({
    email: true,
    password: true
});

