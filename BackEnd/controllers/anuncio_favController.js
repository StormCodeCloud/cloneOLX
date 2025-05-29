const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const AnuncioFavorito = require("../models/anuncio_favorito")(
  sequelize,
  Sequelize.DataTypes
);

// Listar todos os favoritos
async function listarFavoritos(req, res) {
  try {
    const favoritos = await AnuncioFavorito.findAll();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar favoritos", error });
  }
}

// Adicionar um favorito
async function adicionarFavorito(req, res) {
  const { id_utilizador, id_anuncio } = req.body;
  try {
    const favorito = await AnuncioFavorito.create({
      id_utilizador,
      id_anuncio,
    });
    res.status(201).json(favorito);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar favorito", error });
  }
}

// Exporta as funções para serem usadas em outras partes da aplicação
module.exports = {
  listarFavoritos,
  adicionarFavorito,
};
