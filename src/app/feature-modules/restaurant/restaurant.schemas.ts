import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { sequelize} from "../../connections/pg.connections.js"
import type { Users } from "../users/user.schemas.js";



export class Restaurants extends Model<InferAttributes<Restaurants>, InferCreationAttributes<Restaurants>> {

 declare id: CreationOptional<string>;
  declare name:string
  declare location:string
  declare owner_id: ForeignKey<Users["id"]>
  declare revenue:number
  declare profit:number
  declare expenses:number
}

Restaurants.init({
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
}
},{
  sequelize,
  tableName:"restaurants",
  timestamps:false 
}
)