import e from "express";
import { hashPassword } from "../../../utilities/hash-password.js";
import { transporter } from "../../../utilities/nodemailer.js";
import { AuthResponses } from "../auth/auth.responses.js";
import userRepo from "./user.repo.js";
import { UserResponses } from "./user.responses.js";
import type { User } from "./user.types.js";
import { th } from "zod/locales";
import type { Users } from "./user.schemas.js";


export const createUser=async(user:Omit<User,"id">)=>{
  try{

    const userExists = await userRepo.findOne({email:user.email});
    if (userExists) throw AuthResponses.USER_ALREADY_EXISTS;
    
    user.password = await hashPassword(user.password);
    console.log(user.password)
    await userRepo.create(user)

    console.log("user created ")

   
    return UserResponses.USER_CREATED
  }catch(e:any){

    throw e;
  }
}


export const findOne=async(user:Partial<User>)=>{
  try{
    
      console.log("inn user servicessssssssss")
      return  userRepo.findOne(user)

  }catch(e){
   throw UserResponses.USER_NOT_FOUND
  }
}


export const findAllByRole=async (role:string)=>{
  try{
    console.log("inn user servicessssssssss");
    const result = await userRepo.findAllByRole(role);
    const usersWithoutPassword = [];
   for(let staff of result){
    const {password,id,version,...userWithoutPassword} = staff.toJSON();
    usersWithoutPassword.push(userWithoutPassword);
   }
    return  usersWithoutPassword;
  }catch(e){
    throw UserResponses.USER_NOT_FOUND
  }
} 


export const searchByName = async(name:string)=>{
  try{
    const result= await userRepo.searchByName(name);
    const searchResult=[];
    console.log(result)
     for(let user of result){
    const {password,id,version,...userWithoutPassword} = user.toJSON();
    searchResult.push(userWithoutPassword);
   }
   console.log(searchResult)
    if(searchResult.length===0)return UserResponses.USER_NOT_FOUND


    return searchResult

  }catch(e){
   throw UserResponses.USER_NOT_FOUND;

  }

}


    export const filter=async(user:Partial<User>)=>{
      try{
      const result= await userRepo.findAll(user);
    const searchResult = [];
     for(let user of result){
    const {password,id,version,...userWithoutPassword} = user.toJSON();
    searchResult.push(userWithoutPassword);
    if(searchResult.length===0)return UserResponses.USER_NOT_FOUND
   }
return searchResult
      }catch(e){
        throw e;
      }
    }


export const sort =async(user:Partial<User>)=>{
  try{
    let result: Users[]=[];
    if(user.name){

       result = await userRepo.findAll(user);
    }
    if(user.role_id){
        result = await userRepo.findAllByRole(user.role_id);
    }
    if(Object.keys(result).length===0)return UserResponses.USER_NOT_FOUND;
    const searchResult = [];
     for(let user of result){
        const {password,id,version,...userWithoutPassword} = user.toJSON();
        searchResult.push(userWithoutPassword);
   }

return searchResult;
   
  }catch(e){
    throw e;
  }

}





export const sendMail = (userEmail:string,password:string) => {
     transporter.sendMail({
          from:'vidhi.farate@coditas.com', 
          to:userEmail,
          subject:"Onboarding mail ", 
          text:"Hii,Congratulations!", 
          html: `<div><b>Welcome to our platform !</b> <br><br> <p>Here are your credentials: </p><br> email: ${userEmail}<br>password:${password}<br><br><br> <a href="https://coditas.com/">Change Password</a> </div>`
     });
    }
    

// export const getAllUsers=async()=>{
//   try{
//     const allUsers= await userRepo.findAll();
//     return allUsers;
    
//   }catch(e){
//     throw e;

//   }
// }

// export const mail=()=>{
//   sendMail();

// }



export default {createUser,findOne,findAllByRole,searchByName,sendMail,filter,sort}











