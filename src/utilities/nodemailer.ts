import nodemailer from "nodemailer"
import { env } from "../validate.env.js";


export const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:env.EMAIL,    
        pass:env.GOOGLE_APP_PASSWORD
    },
});

