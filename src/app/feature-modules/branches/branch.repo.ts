import { Branches } from "./branch.schemas.js";
import type { Branch } from "./branch.types.js";

const create =  (branch:Omit<Branch,"id">)=> Branches.create(branch);
const findAll = (branch:Partial<Branch>)=> Branches.findAll({where: branch});

const findByPk=(branch:Partial<Branch>)=>Branches.findByPk(branch.id);
const deleteBranch=(branch:Partial<Branch>)=>Branches.destroy({where:branch});

export default {
  create,
  findAll,
  findByPk,
  deleteBranch

}

