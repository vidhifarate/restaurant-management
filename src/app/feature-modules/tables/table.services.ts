import { TableResponses } from "./table.responses.js";
import type { Table } from "./table.types.js";
import tablesRepo from "./tables.repo.js";

const addTable=async(table:Omit<Table,"id">)=>{
  try{
   await  tablesRepo.create(table);
   return TableResponses.TABLE_CREATED;
  }catch(e){
    throw TableResponses.TABLE_CREATION_FAILED
  }

}
const search = async(table:Partial<Table>)=>{
  try{
    const result = tablesRepo.findAll(table);
    return result ;

  }catch(e){

    throw TableResponses.TABLE_NOT_FOUND ;
  }
}

export default {
  addTable,search
}