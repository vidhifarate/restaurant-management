import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { tr } from "zod/locales";
import { sequelize } from "../../connections/pg.connections.js";

export class Permissions extends Model <InferAttributes<Permissions>,InferCreationAttributes<Permissions>>{
  declare id :CreationOptional<String>
  declare action:string

}
Permissions.init({
  id:{
    type:DataTypes.UUID,
    primaryKey:true,
    defaultValue:()=>crypto.randomUUID()
    

  },
  action:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{
  sequelize,
  tableName:'permissions',
  timestamps:false

  
});
