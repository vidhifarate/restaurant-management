import { Op } from "sequelize";
import { Users } from "./user.schemas.js";
import type { User } from "./user.types.js";

// export const create =(user:Omit<User,"id"|"restaurant_id"|"branch_id">)=> Users.create(user);
export const create =(user:Omit<User,"id">)=> Users.create(user);


export const findOne=(user:Partial<User>)=> Users.findOne({where:user});


export const findAllByRole=(role:string)=> Users.findAll({where:{
    role_id:{
      [Op.iLike]:`%${role}%`
    }}});


const searchByName=(name:string)=> Users.findAll({where:{
    name:{
      [Op.iLike]:`%${name}%`
    }
  
  }});



//   const filter=(query:Partial<User>)=>({

//     try{
//       return User.findAll(
//           where:{
//     name:{
//       [Op.iLike]: `%${query.name}%`
//     },
//     role:query.role
    
//   },
//   order:[['name','DESC']],
//   limit:1

//       )
     
//   }
//   catch(e){
//     throw (e)
//   }
//   }
   
// );


const findAll=(user:Partial<User>)=>{
  try{
    return Users.findAll({
      where:{
        name:{
          [Op.iLike]:`%${user.name}%`
        },
        role_id:user.role_id
      },
      order:[['name','ASC']],
      limit:1
    })
  }catch(e){
    throw e
  }
}






export default {
  create,findOne,findAll,findAllByRole,searchByName
}

