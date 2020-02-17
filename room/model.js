const db = require("../db");
const Sequelize = require("sequelize");
const User = require("../user/model");

const Room = db.define("room", {
  name: Sequelize.STRING
});

User.belongsTo(Room);
// Room.hasMany(User);

module.exports = Room;
