const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const mensagem = require("../models/mesangem")(sequelize, Sequelize.DataTypes);

// Listar todas as mensagens
async function listarMensagens(req, res) {
  try {
    const mensagens = await mensagem.findAll();
    res.status(200).json(mensagens);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar mensagens", error });
  }
}

module.exports = {
  listarMensagens,
};
