import { Sequelize } from "sequelize";

export function connect() {
  try {
    const conn = new Sequelize({
      dialect: "sqlite",
      storage: "./src/dbConfig/database.sqlite",
    });

    console.log("Database connected");

    return conn;
  } catch (error) {
    console.log(error);
  }
}
