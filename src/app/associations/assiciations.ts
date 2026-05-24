import { Users } from "../feature-modules/users/user.schemas.js";
import { Restaurants } from "../feature-modules/restaurant/restaurant.schemas.js";
import { Tables } from "../feature-modules/tables/tables.schemas.js";
import { Branches } from "../feature-modules/branches/branch.schemas.js";
import { Menu } from "../feature-modules/menue/menu.schemas.js";
import { Roles } from "../feature-modules/roles/roles.schema.js";
import { Permissions } from "../feature-modules/permissions/permission.schemas.js";


export const asocciations=()=>{

  Restaurants.hasMany(Branches,{foreignKey:'restaurant_id'});
  Branches.belongsTo(Restaurants,{foreignKey:'restaurant_id'});
  
  Branches.hasMany(Tables,{foreignKey:'branch_id'});
  Tables.belongsTo(Branches,{foreignKey:'branch_id'});
  
  Restaurants.hasMany(Menu,{foreignKey:'restaurant_id'});
  Menu.belongsTo(Restaurants,{foreignKey:'restaurant_id'});
  
  Restaurants.hasMany(Roles,{foreignKey:'restaurant_id'});
  Roles.belongsTo(Restaurants,{foreignKey:'restaurant_id'});
  
  Branches.hasMany(Roles,{foreignKey:'branch_id'});
  Roles.belongsTo(Branches,{foreignKey:'branch_id'});
  
  Roles.hasMany(Permissions,{foreignKey:'role_id'});
  Permissions.belongsTo(Roles,{foreignKey:'role_id'});
  
  // Users.hasMany(Permissions,{foreignKey:'user_id'});
  // Permissions.belongsTo(Users,{foreignKey:'user_id'});
   
}










