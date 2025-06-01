const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const { Localizacao } = require("../models");

// Listar todas as localizações
async function listarLocalizacoes(req, res) {
  try {
    const localizacoes = await Localizacao.findAll();
    res.status(200).json(localizacoes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar localizações", error });
  }
}

// Adicionar uma nova localização
async function adicionarLocalizacao(req, res) {
  const { nome_localizacao } = req.body;
  try {
    const novaLocalizacao = await Localizacao.create({
      nome_localizacao,
    });
    res.status(201).json(novaLocalizacao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar localização", error });
  }
}

module.exports = {
  listarLocalizacoes,
  adicionarLocalizacao,
};
