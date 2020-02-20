const db = require("../db");
const Sequelize = require("sequelize");
const User = require("../user/model");
const Message = require("../message/model");
const DrawingLine = require("../gameData/drawingLine/model");

const Room = db.define("room", {
  name: Sequelize.STRING
});

User.belongsTo(Room);
Message.belongsTo(Room);
DrawingLine.belongsTo(Room);
Room.hasMany(User);
Room.hasMany(Message);
Room.hasMany(DrawingLine);

module.exports = Room;
