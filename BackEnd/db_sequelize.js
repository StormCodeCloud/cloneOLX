const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cloneOLX", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;
