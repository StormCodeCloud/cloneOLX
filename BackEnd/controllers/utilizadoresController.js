const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const utilizadores = require("../models/utilizadores")(
  sequelize,
  Sequelize.DataTypes
);

// Listar todos os utilizadores
async function listarUtilizadores(req, res) {
  try {
    const utilizadoresList = await utilizadores.findAll();
    res.status(200).json(utilizadoresList);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar utilizadores", error });
  }
}

//  Registo de utilizadores: Os utilizadores devem ser capazes de se registar fornecendo um nome de utilizador, e-mail e password
async function registarUtilizador(req, res) {
  const { nome, email, password } = req.body;
  try {
    const novoUtilizador = await utilizadores.create({
      nome,
      email,
      password,
    });
    res.status(201).json(novoUtilizador);
  } catch (error) {
    res.status(500).json({ message: "Erro ao registar utilizador", error });
  }
}

// Login de utilizadores: Os utilizadores devem ser capazes de fazer login utilizando seu nome de utilizador e password
async function loginUtilizador(req, res) {
  const { email, password } = req.body;
  try {
    const utilizador = await utilizadores.findOne({
      where: { email, password },
    });
    if (utilizador) {
      res.status(200).json(utilizador);
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error });
  }
}

// Os utilizadores autenticados devem ser capazes de criar anúncios
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

module.exports = {};
