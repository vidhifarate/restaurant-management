import zod from "zod" ;

const envSchema=zod.object({
  PORT:zod.coerce.number({message:"port should be a number"}),
  DB_NAME:zod.string(),
  DB_USERNAME:zod.string(),
  DB_PASSWORD:zod.string(),

  GOOGLE_APP_PASSWORD:zod.string(),
  EMAIL:zod.string().email()

});

export const env =envSchema.parse(process.env);