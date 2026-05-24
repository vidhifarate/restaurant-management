
import crypto from "crypto"; 
import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connections.js";
import type { User } from "./user.types.js";
import { Branches } from "../branches/branch.schemas.js";
import { Roles } from "../roles/roles.schema.js";

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: ForeignKey<Roles["id"]>;
  declare restaurant_id: ForeignKey<Branches["id"]>&CreationOptional<string>;
  declare branch_id: ForeignKey<Branches["id"]>&CreationOptional<string>;
  declare profile_picture:CreationOptional<string>;
  declare version:number;
}

Users.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => crypto.randomUUID() 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Roles, key: 'id' }
  },
  restaurant_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Branches, key: 'id' }
   
  },
  branch_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Branches, key: 'id' }
    
  },
  profile_picture:{
    type:DataTypes.STRING,
    allowNull: true,
  },
  version:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
}, {
  sequelize,
  tableName: "users",
  timestamps: false 
});
