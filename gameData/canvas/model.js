const db = require("../../db");
const Sequelize = require("sequelize");

const Canvas = db.define("canvas", {
  data: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
});

module.exports = Canvas;
