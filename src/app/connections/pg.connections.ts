import { Sequelize } from "sequelize";
import { env } from "../../validate.env.js";

export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    dialect: "postgres",
    logging: false // Toggle to true if you want to inspect generated SQL tables in the terminal
  }
);

export const connectToPG = async () => {
  try {
    await sequelize.authenticate();
    console.log("🚀 Live database connection handshake established successfully.");

    // 1. Dynamic runtime load of the associations function to prevent loops
    const { asocciations } = await import("../associations/assiciations.js");
    asocciations();

    // 2. Synchronize memory definitions directly with PostgreSQL
    await sequelize.sync({ alter: true });
    console.log("🔄 PostgreSQL tables altered and generated cleanly.");
    
  } catch (e) {
    console.error("❌ Critical Database Connection Interruption: ", e);
    process.exit(1);
  }
};