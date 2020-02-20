const Sequelize = require("sequelize");
const dbUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:whatever@localhost:5432/postgres";

const db = new Sequelize(dbUrl);

const syncDatabase = async () => {
  try {
    await db.sync({ force: prcess.env.FORCE || false });
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};

syncDatabase();

module.exports = db;
