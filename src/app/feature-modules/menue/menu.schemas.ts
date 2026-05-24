import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { sequelize} from "../../connections/pg.connections.js";
import type {Menue}  from "./menu.types.js";
import type { Restaurants } from "../restaurant/restaurant.schemas.js";
import type { Branches } from "../branches/branch.schemas.js";




export class Menu extends Model<InferAttributes<Menu>, InferCreationAttributes<Menu>> {

   declare id: CreationOptional<string>;
  declare name:string
  declare price:number
  declare tag :"veg"|"non-veg";
  declare restaurant_id: ForeignKey<Restaurants["id"]>;
  declare branch_id: ForeignKey<Branches["id"]>;
 declare pictures:string
  declare ingredients: CreationOptional<string>;
  declare discription: CreationOptional<string>;
  declare is_liqor:boolean;
  declare spiceLevel: "mild"|"medium"|"high";
  declare calories: CreationOptional<number>;


}

Menu.init({
  id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
},
  price:{
    type:DataTypes.INTEGER,
    allowNull:false
},
tag:{
  type:DataTypes.ENUM("veg","non-veg"),
  allowNull:false,

},
restaurant_id:{
  type:DataTypes.UUID,
  allowNull :true
  
},
branch_id:{
  type:DataTypes.UUID,
  allowNull :true
  
},
ingredients:{
  type:DataTypes.STRING,
  allowNull:true
  
},
pictures:{
  type:DataTypes.STRING,
  allowNull:false
  
},
discription:{
  type:DataTypes.STRING,
  allowNull:true
  
},
is_liqor:{
  type:DataTypes.BOOLEAN,
  allowNull:false
  
},
spiceLevel:{
  type:DataTypes.ENUM("mild","medium","high"),
  allowNull:true
  
},
calories:{
  type:DataTypes.INTEGER,
  allowNull:true    
}},
{
  sequelize,
  tableName:"menu",
  timestamps:false 
}
)