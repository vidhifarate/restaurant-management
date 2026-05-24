
import crypto from "crypto"; 
import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connections.js";
import type { User } from "./user.types.js";
import type { Branches } from "../branches/branch.schemas.js";

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: User['role'];
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
    type: DataTypes.ENUM("admin", "restaurantOwner", "manager", "kitchenStaff", "serviceStaff"),
    allowNull: false
  },
  restaurant_id: {
    type: DataTypes.UUID,
    allowNull: true,
   
  },
  branch_id: {
    type: DataTypes.UUID,
    allowNull: true,
    
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
