const { Sequelize } = require("sequelize");
require("dotenv").config();
//dotenv é usado para carregar variáveis de ambiente do arquivo .env

const sequelize = new Sequelize(
  process.env.DB_NAME || "cloneOLX",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false, // Desativa os logs do Sequelize
  }
);

module.exports = sequelize;
