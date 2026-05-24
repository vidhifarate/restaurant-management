import menueRepo from "./menu.repo.js";
import { MenuResponses } from "./menu.responses.js";
import type { Menue } from "./menu.types.js";

 const addMenue=async(menue:Omit<Menue,"id">)=>{
  try{
    await menueRepo.create(menue);
    return MenuResponses.MENU_ADDED
  }catch(e){
    throw MenuResponses.MENU_CREATION_FAILED
  }
}


 const search=async(menue:Partial<Menue>)=>{
  try{
    const result = await menueRepo.findOne(menue);
    return result;
  }catch(e){
  throw MenuResponses.MENU_NOT_FOUND
  }
}
const deleteMenue=async(menue:Partial<Menue>)=>{
  try{
    const ifExists = await menueRepo.findByID(menue);
    if(!ifExists) throw MenuResponses.MENU_NOT_FOUND
    const result = await menueRepo.deleteMenue(menue);
    return result;
  }catch(e){
    throw (e)
  }
}

// const updateMenue=async(menue:Partial<Menue>)=>{
//   try{
//     const menu= await menueRepo.findByID(menue);
//     if(!menu) throw MenuResponses.MENU_NOT_FOUND

//     await menueRepo.update(menue.id, menue);
//     return 'Menu updated successfully';
//   }catch(e){
//      throw (e)

//   }
// }
export default{
  addMenue,search,deleteMenue
}
