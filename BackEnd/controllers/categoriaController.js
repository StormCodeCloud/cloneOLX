const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const Categoria = require("../models/categoria")(
  sequelize,
  Sequelize.DataTypes
);

// Listar todas as categorias
async function listarCategorias(req, res) {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar categorias", error });
  }
}

//Criar uma nova categoria
async function createAnnouncement(req, res) {
  const { nome_categoria } = req.body;
  try {
    const novaCategoria = await Categoria.create({
      nome_categoria,
    });
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar categoria", error });
  }
}

module.exports = {
  listarCategorias,
  createAnnouncement,
};
