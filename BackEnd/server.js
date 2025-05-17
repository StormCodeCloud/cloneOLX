const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const port = 3000;
const app = express();

// Configuração do Sequelize
const sequelize = new Sequelize("cloneOLX", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

// Testar conexão
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão Sequelize estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MySQL via Sequelize:", err);
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}.`);
});
