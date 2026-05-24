import { Menu } from "./menu.schemas.js";
import type { Menue } from "./menu.types.js";

 const create =(menue:Omit<Menue,"id">)=> Menu.create(menue);
 const findOne=(menue:Partial<Menue>)=> Menu.findOne({where:menue});
const findByID=(menue:Partial<Menue>)=> Menu.findByPk(menue.id);

 const deleteMenue= (menue:Partial<Menue>)=>Menu.destroy({where:menue});

// const update=(id:number, menue:Partial<Menue>)=> Menu.update({menue},{where:{id}})






export default {
  create,
  findOne,
  deleteMenue,
  findByID
}