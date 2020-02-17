const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: Sequelize.STRING,
  points: Sequelize.INTEGER,
  matchesPlayed: Sequelize.INTEGER
});

module.exports = User;
