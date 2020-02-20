const db = require("../../db");
const Sequelize = require("sequelize");

const DrawingLine = db.define("drawing line", {
  data: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING)),
  roomId: Sequelize.INTEGER
});

module.exports = DrawingLine;
