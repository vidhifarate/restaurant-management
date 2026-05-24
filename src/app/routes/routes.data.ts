import authRoutes from "../feature-modules/auth/auth.routes.js";
import type { Routes } from "./routes.types.js";
import menueRoutes from "../feature-modules/menue/menu.routes.js";
import userRoutes from "../feature-modules/users/user.routes.js";
import orderRoutes from "../feature-modules/orders/order.routes.js";
import branchRoutes from "../feature-modules/branches/branch.routes.js";
import restaurantRoutes from "../feature-modules/restaurant/restaurant.routs.js";


export const routes:Routes=[authRoutes,menueRoutes,userRoutes,orderRoutes,branchRoutes,restaurantRoutes];
