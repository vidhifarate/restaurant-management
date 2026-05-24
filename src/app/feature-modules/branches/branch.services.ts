import type { Menue } from "../menue/menu.types.js";
import branchRepo from "./branch.repo.js";
import { BranchResponses } from "./branch.responses.js";
import type { Branch } from "./branch.types.js";

 const addBranch=async(branch:Omit<Branch,"id">)=>{
  try{
    await branchRepo.create(branch);
    return BranchResponses.BRANCH_CREATED
  }catch(e){
    throw BranchResponses.BRANCH_CREATION_FAILED
  }
}

const deleteBranch = async(branch:Partial<Menue>)=>{

  try{
    const ifExists = await branchRepo.findByPk(branch);
    if(!ifExists) throw BranchResponses.BRANCH_NOT_FOUND
    const result = await branchRepo.deleteBranch(branch);
    return BranchResponses.DELETED_A_BRANCH;
  }catch(e){
    throw (e)
  }
}

const search=async(menue:Partial<Menue>)=>{
  try{
    const result = await branchRepo.findAll(menue);
    return result;
  }catch(e){
  throw BranchResponses.BRANCH_NOT_FOUND
  }
}


export default {
  addBranch,
  deleteBranch,
  search
}
