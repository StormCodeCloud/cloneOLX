const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const Anuncio = require("../models/anuncio")(sequelize, Sequelize.DataTypes);

// Listar todos os anúncios
async function listarAnuncios(req, res) {
  try {
    const anuncios = await Anuncio.findAll();
    res.status(200).json(anuncios);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar anúncios", error });
  }
}

// Criar um novo anúncio
async function criarAnuncio(req, res) {
  const {
    id_utilizador,
    id_categoria,
    id_localizacao,
    titulo_anuncio,
    preco_anuncio,
  } = req.body;
  try {
    const novoAnuncio = await Anuncio.create({
      id_utilizador,
      id_categoria,
      id_localizacao,
      titulo_anuncio,
      preco_anuncio,
    });
    res.status(201).json(novoAnuncio);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar anúncio", error });
  }
}

module.exports = {
  listarAnuncios,
  criarAnuncio,
};
