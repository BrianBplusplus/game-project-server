const Sequelize = require("sequelize");
const db = require("../../db");
const Category = require("../category/model");

const Title = db.define(
  "title",
  {
    name: Sequelize.STRING
  },
  { timestamps: false }
);

Title.belongsTo(Category);

module.exports = Title;
