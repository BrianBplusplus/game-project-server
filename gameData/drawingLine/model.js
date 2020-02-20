const db = require("../../db");
const Sequelize = require("sequelize");

const DrawingLine = db.define("drawingLine", {
  data: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING)),
  roomId: Sequelize.INTEGER,
  color: Sequelize.ARRAY(Sequelize.FLOAT),
  userId: Sequelize.INTEGER
});

module.exports = DrawingLine;
