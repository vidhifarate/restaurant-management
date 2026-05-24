import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { sequelize} from "../../connections/pg.connections.js"



export class Tables extends Model<InferAttributes<Tables>, InferCreationAttributes<Tables>> {

   declare id: CreationOptional<string>;
  declare table_no:number;
  declare capacity:number;
  declare restaurant_id:string;
  declare branch_id:string;
  declare waiter_id:string;
  declare status :"available"|"reserved"|"occupied"         

}

Tables.init({
  id:{
   type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
  },
  table_no:{
    type:DataTypes.INTEGER,
    allowNull:false
},
  capacity:{
    type:DataTypes.INTEGER,
    allowNull:false
},
restaurant_id:{
  type:DataTypes.UUID,
  allowNull:false
},

branch_id:{
  type:DataTypes.UUID,
  allowNull:false
},

waiter_id:{
  type:DataTypes.UUID,
  allowNull:false
},
status:{
  type:DataTypes.ENUM("available","reserved","occupied"),
  allowNull:false
},


},{
  sequelize,
  tableName:"tables",
  timestamps:false 
}
)

// export class Tables extends Model<InferAttributes<Tables>, InferCreationAttributes<Tables>> {
//   declare id: CreationOptional<string>;
//   declare table_no: number;
//   declare capacity: number;
//   declare restaurant_id: string;
//   declare branch_id: string;
//   declare waiter_id: string;
//   declare status: "available" | "reserved" | "occupied";         
// }

// Tables.init({
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   table_no: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   capacity: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   restaurant_id: {
//     type: DataTypes.UUID, // 🛠️ FIX: Change from STRING to UUID
//     allowNull: false
//   },
//   branch_id: {
//     type: DataTypes.UUID, // 🛠️ FIX: Change from STRING to UUID
//     allowNull: false
//   },
//   waiter_id: {
//     type: DataTypes.UUID, // 🛠️ FIX: Change from STRING to UUID
//     allowNull: false
//   },
//   status: {
//     type: DataTypes.ENUM("available", "reserved", "occupied"),
//     allowNull: false
//   },
// }, {
//   sequelize,
//   tableName: "tables",
//   timestamps: false 
// });