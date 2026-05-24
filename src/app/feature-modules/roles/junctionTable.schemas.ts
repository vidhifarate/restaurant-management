import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import type { Restaurants } from "../restaurant/restaurant.schemas.js";
import type { Branches } from "../branches/branch.schemas.js";
import { sequelize } from "../../connections/pg.connections.js";
import { Permissions } from "../permissions/permission.schemas.js";
import { Roles } from "./roles.schema.js";



export class RolePermissions extends Model<InferAttributes<RolePermissions>, InferCreationAttributes<RolePermissions>> {
  declare role_id: ForeignKey<Roles["id"]>;
  declare permission_id: ForeignKey<Permissions["id"]>;
}

RolePermissions.init({
  role_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: { model: Roles, key: 'id' }
  },
  permission_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: { model: Permissions, key: 'id' }
  }
}, {
  sequelize,
  tableName: 'role_permissions',
  timestamps: false
});