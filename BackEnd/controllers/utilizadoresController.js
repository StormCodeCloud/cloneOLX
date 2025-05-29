const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const utilizadores = require("../models/utilizadores")(
  sequelize,
  Sequelize.DataTypes
);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

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
  const { nome, email, password, telefone } = req.body;
  try {
    // Verifica se já existe utilizador com o mesmo email
    const existente = await utilizadores.findOne({ where: { email } });
    if (existente) {
      return res.status(400).json({ message: "Email já registado." });
    }
    // Hash da password
    const hash = await bcrypt.hash(password, 10);
    const novoUtilizador = await utilizadores.create({
      nome,
      email,
      password: hash,
      telefone,
    });
    res.status(201).json({
      message: "Utilizador registado com sucesso!",
      utilizador: novoUtilizador,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registar utilizador", error });
  }
}

// Login de utilizadores: Os utilizadores devem ser capazes de fazer login utilizando seu nome de utilizador e password
async function loginUtilizador(req, res) {
  const { email, password } = req.body;
  try {
    const utilizador = await utilizadores.findOne({ where: { email } });
    if (!utilizador) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    // Verifica a password
    const isPasswordValid = await bcrypt.compare(password, utilizador.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    // Gera token JWT
    const token = jwt.sign(
      { id: utilizador.id_utilizador, email: utilizador.email },
      SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      message: "Login efetuado com sucesso!",
      token,
      utilizador: {
        id: utilizador.id_utilizador,
        nome: utilizador.nome,
        email: utilizador.email,
      },
    });
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

// Visualizar todos os utilizadores
async function listarUtilizadores(req, res) {
  try {
    const utilizadoresList = await utilizadores.findAll();
    res.status(200).json(utilizadoresList);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar utilizadores", error });
  }
}

// Editar utilizador
async function editarUtilizador(req, res) {
  const { id } = req.params;
  const { nome, email, telefone, estado_conta } = req.body;
  try {
    const utilizador = await utilizadores.findByPk(id);
    if (!utilizador)
      return res.status(404).json({ message: "Utilizador não encontrado" });
    await utilizador.update({ nome, email, telefone, estado_conta });
    res.status(200).json({
      message: "Utilizador atualizado com sucesso",
      utilizador,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao editar utilizador", error });
  }
}

// Excluir utilizador
async function excluirUtilizador(req, res) {
  const { id } = req.params;
  try {
    const utilizador = await utilizadores.findByPk(id);
    if (!utilizador)
      return res.status(404).json({ message: "Utilizador não encontrado" });
    await utilizador.destroy();
    res.status(200).json({ message: "Utilizador excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir utilizador", error });
  }
}

module.exports = {
  listarUtilizadores,
  registarUtilizador,
  loginUtilizador,
  criarAnuncio,
  editarUtilizador,
  excluirUtilizador,
};
