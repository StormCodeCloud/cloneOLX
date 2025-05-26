const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const Historico = require("../models/historico_visualizacao")(
  sequelize,
  Sequelize.DataTypes
);

// Listar todos os históricos
async function listarHistoricos(req, res) {
  try {
    const historicos = await Historico.findAll();
    res.status(200).json(historicos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar históricos", error });
  }
}

// Adicionar um histórico
async function adicionarHistorico(req, res) {
  const { id_utilizador, id_anuncio } = req.body;
  try {
    const historico = await Historico.create({
      id_utilizador,
      id_anuncio,
    });
    res.status(201).json(historico);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar histórico", error });
  }
}

module.exports = {
  listarHistoricos,
  adicionarHistorico,
};
