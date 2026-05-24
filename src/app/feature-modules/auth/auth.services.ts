
import { access } from "node:fs";
import { generateAccessToken, generateRefreshToken, invalidateToken } from "../../../utilities/tokens.js";
import userServices from "../users/user.services.js";
import type { User } from "../users/user.types.js";
import { AuthResponses } from "./auth.responses.js";
import {compare} from "bcrypt"


export const login = async (credentials: Pick<User, "email" | "password" | "role_id">) => {
  try {
    console.log("in tryyyyyyy")
    const user = await userServices.findOne({ email: credentials.email });

    console.log("checkkkkkkkkkk")

    if (!user) throw AuthResponses.USER_NOT_FOUND;
    console.log(user.password, credentials.password)

    const didMatch = await compare(credentials.password,user.password)
    console.log(didMatch)
    
    if (!didMatch) throw AuthResponses.INVALID_CREDENTIALS;

    const accessToken =await generateAccessToken(user.role_id);
    const refreshToken = await generateRefreshToken(user.role_id
    );

    const { password, ...userWithoutPassword } = user.toJSON();

    console.log("user logged in ");

    return { userWithoutPassword, accessToken,refreshToken };
    // return { userWithoutPassword };


  } catch (e) {
    console.log(e);
    throw AuthResponses.INVALID_CREDENTIALS;
    // throw e;
  }
}

const logout = async (accessToken:string,refreshToken:string)=>{  
  try{
    
    
invalidateToken(accessToken,refreshToken)
  }catch(e){
    throw e;
  }
}


export default { login, logout }
