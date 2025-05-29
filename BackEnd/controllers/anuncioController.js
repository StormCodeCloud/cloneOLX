const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const Anuncio = require("../models/anuncio")(sequelize, Sequelize.DataTypes);
const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

// Middleware para autenticação JWT
function autenticarJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    next();
  });
}

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

// Criar anúncio (apenas autenticado)
async function criarAnuncioAutenticado(req, res) {
  const { titulo, descricao, preco, id_categoria, id_localizacao } = req.body;
  try {
    const novoAnuncio = await Anuncio.create({
      titulo,
      descricao,
      preco,
      id_utilizador: req.user.id, // do token JWT
      id_categoria,
      id_localizacao,
    });
    res.status(201).json(novoAnuncio);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar anúncio", error });
  }
}

// Editar anúncio
async function editarAnuncio(req, res) {
  const { id } = req.params;
  const { titulo, descricao, preco, estado, id_categoria, id_localizacao } =
    req.body;
  try {
    const anuncio = await Anuncio.findByPk(id);
    if (!anuncio)
      return res.status(404).json({ message: "Anúncio não encontrado" });
    await anuncio.update({
      titulo,
      descricao,
      preco,
      estado,
      id_categoria,
      id_localizacao,
    });
    res
      .status(200)
      .json({ message: "Anúncio atualizado com sucesso", anuncio });
  } catch (error) {
    res.status(500).json({ message: "Erro ao editar anúncio", error });
  }
}

// Excluir anúncio
async function excluirAnuncio(req, res) {
  const { id } = req.params;
  try {
    const anuncio = await Anuncio.findByPk(id);
    if (!anuncio)
      return res.status(404).json({ message: "Anúncio não encontrado" });
    await anuncio.destroy();
    res.status(200).json({ message: "Anúncio excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir anúncio", error });
  }
}

module.exports = {
  listarAnuncios,
  criarAnuncio,
  autenticarJWT,
  criarAnuncioAutenticado,
  editarAnuncio,
  excluirAnuncio,
};
