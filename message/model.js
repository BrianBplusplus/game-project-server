const db = require("../db");
const Sequelize = require("sequelize");

const Message = db.define("message", {
  message: Sequelize.STRING
});

module.exports = Message;
