const Sequelize = require("sequelize");
const dbUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:whatever@localhost:5432/postgres";

const db = new Sequelize(dbUrl);

const syncDatabase = async () => {
  try {
    await db.sync({ force: false });
    console.log("Database connected");

    // const Category = require("./gameData/category/model");
    // const Title = require("./gameData/category/model");
    // const checkAndAddData = require("./gameData/initalData");
    // checkAndAddData();
  } catch (error) {
    console.error(error);
  }
};

syncDatabase();

module.exports = db;
