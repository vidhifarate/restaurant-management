import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { sequelize} from "../../connections/pg.connections.js"
import type { User } from "../users/user.types.js";
import type { Users } from "../users/user.schemas.js";
import type { Restaurants } from "../restaurant/restaurant.schemas.js";



export class Branches extends Model<InferAttributes<Branches>, InferCreationAttributes<Branches>> {

   declare id: CreationOptional<string>;
  declare name:string
  declare location:string
  declare owner_id: ForeignKey<Users["id"]>
  declare revenue:number
  declare profit:number
  declare expenses:number
  declare restaurant_id:ForeignKey<Restaurants["id"]>
  declare tag :"veg"|"non-veg"|"both"
  declare category:"luxury"|"budget" 
}

Branches.init({
  id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
},
  location:{
    type:DataTypes.STRING,
    allowNull:false
},
owner_id:{
  type:DataTypes.UUID,
  allowNull:false
},
  revenue:{
    type:DataTypes.INTEGER,
    allowNull:false
},
  profit:{
    type:DataTypes.INTEGER,
    allowNull:false
},
  expenses:{
    type:DataTypes.INTEGER,
    allowNull:false
},
restaurant_id:{
  type:DataTypes.UUID,
  allowNull:false
},
tag:{
  type:DataTypes.ENUM("veg","non-veg","both"),
  allowNull:false
},
category:{
  type:DataTypes.ENUM("luxury","budget"),
  allowNull:false 
}},{
  sequelize,
  tableName:"branches",
  timestamps:false 
}
)