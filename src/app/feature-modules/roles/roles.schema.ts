import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { Restaurants } from "../restaurant/restaurant.schemas.js"
import { Branches } from "../branches/branch.schemas.js"
import { sequelize } from "../../connections/pg.connections.js"

export class Roles extends Model <InferAttributes<Roles>,InferCreationAttributes<Roles>>{
  declare id :CreationOptional<string>
  declare role :string
  declare restaurants_id:ForeignKey<Restaurants["id"]|null>
  declare branch_id:ForeignKey<Branches["id"]|null>
  
} 

Roles.init({
  id:{
    type:DataTypes.UUID,
    primaryKey:true,
     defaultValue: () => crypto.randomUUID() 

  },
  role:{
    type:DataTypes.STRING,
    allowNull:false
   
  },
  restaurants_id:{
    type:DataTypes.UUID,
    allowNull:true,
    references:{model:Restaurants,key:'id'}
  },
  branch_id:{
    type:DataTypes.UUID,
    allowNull:true,
    references:{model:Branches,key:'id'}
  }


},{
  sequelize,
  tableName:'roles',
  timestamps:false
})