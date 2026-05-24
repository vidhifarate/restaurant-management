import { where } from "sequelize";
import type { Table } from "./table.types.js";
import { Tables } from "./tables.schemas.js";


const create =(table:Omit<Table,"id">)=>Tables.create(table);
const findAll= (table:Partial<Table>)=>Tables.findAll({where:table});




export default {create,findAll};