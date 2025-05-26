const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const Imagem = require("../models/imagem")(sequelize, Sequelize.DataTypes);

// Listar todas as imagens
async function listarImagens(req, res) {
  try {
    const imagens = await Imagem.findAll();
    res.status(200).json(imagens);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar imagens", error });
  }
}

// Adicionar uma imagem
async function adicionarImagem(req, res) {
  const { id_anuncio, url_imagem } = req.body;
  try {
    const novaImagem = await Imagem.create({
      id_anuncio,
      url_imagem,
    });
    res.status(201).json(novaImagem);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar imagem", error });
  }
}

module.exports = {
  listarImagens,
  adicionarImagem,
};
