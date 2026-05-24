
import { Sequelize } from "sequelize";
import { env } from "../../validate.env.js";
import { asocciations } from "../associations/assiciations.js";

export const sequelize=new Sequelize(
  env.DB_NAME,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    dialect:"postgres"
  }
);

export const connectToPG=async()=>{
  try{
    await sequelize.authenticate();
    // sequelize.sync({alter:true});

  // asocciations();
  console.log("connected to DB ");
  
  
  }catch(e){
    console.log("error: ",e);

  }
}