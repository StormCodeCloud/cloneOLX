const { Sequelize } = require("sequelize");
const sequelize = require("../db_sequelize");
const { Administrador, Utilizador } = require("../models");
const bcrypt = require("bcrypt");

// Listar todos os administradores
async function listarAdministradores(req, res) {
  const { Administrador } = require("../models"); // Carregamento tardio
  try {
    const admins = await Administrador.findAll({
      attributes: { exclude: ["password_administrador"] },
    });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Erro ao listar administradores:", error);
    res.status(500).json({
      message: "Erro ao buscar administradores",
      error: error.message,
    });
  }
}

// Criar um novo administrador
async function criarAdministrador(req, res) {
  const { nome_administrador, email_administrador, password_administrador } =
    req.body;

  // Validação de campos
  if (!nome_administrador || !email_administrador || !password_administrador) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios",
      camposRecebidos: { nome_administrador, email_administrador },
    });
  }

  // Validar formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_administrador)) {
    return res.status(400).json({ message: "Formato de email inválido" });
  }

  try {
    // Verificar se já existe um admin com este email
    const adminExistente = await Administrador.findOne({
      where: { email_administrador },
    });

    if (adminExistente) {
      return res.status(400).json({ message: "Este email já está em uso" });
    }

    // Criptografar a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      password_administrador,
      saltRounds
    );

    // Criar o novo administrador
    const novoAdmin = await Administrador.create({
      nome_administrador,
      email_administrador,
      password_administrador: hashedPassword,
    });

    // Remove a senha do objeto de resposta
    const { password_administrador: _, ...adminSemSenha } = novoAdmin.toJSON();

    res.status(201).json({
      message: "Administrador criado com sucesso",
      administrador: adminSemSenha,
    });
  } catch (error) {
    console.error("Erro ao criar administrador:", error);
    res.status(500).json({
      message: "Erro ao criar administrador",
      error: error.message,
    });
  }
}

// Autenticar administrador
async function loginAdmin(req, res) {
  const { email_administrador, password_administrador } = req.body;

  try {
    const admin = await Administrador.findOne({
      where: { email_administrador },
    });

    if (!admin) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(
      password_administrador,
      admin.password_administrador
    );

    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Remove a senha do objeto de resposta
    const { password_administrador: _, ...adminSemSenha } = admin.toJSON();

    res.status(200).json({
      message: "Login efetuado com sucesso",
      administrador: adminSemSenha,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      message: "Erro ao realizar login",
      error: error.message,
    });
  }
}

// Eliminar utilizadores não administradores
async function eliminarUtilizadoresNaoAdmin(req, res) {
  try {
    // Marcar utilizadores como "eliminado" em vez de deletar fisicamente
    const result = await Utilizador.update(
      { estado_conta: "eliminado" },
      { where: { estado_conta: "ativo" } }
    );

    const numAtualizados = result[0]; // número de registros atualizados

    res.status(200).json({
      message: `${numAtualizados} utilizadores marcados como eliminados.`,
      detalhes:
        "Os utilizadores foram marcados como eliminados em vez de serem removidos fisicamente do banco de dados.",
    });
  } catch (error) {
    console.error("Erro ao eliminar utilizadores:", error);
    res.status(500).json({
      message: "Erro ao eliminar utilizadores",
      error: error.message,
    });
  }
}

// Logout de administradores: Invalida o token JWT
async function logoutAdmin(req, res) {
  try {
    // Em um sistema real, você pode implementar uma lista de tokens revogados ou alterar o segredo JWT
    res
      .status(200)
      .json({ message: "Logout de administrador realizado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao realizar logout de administrador", error });
  }
}

module.exports = {
  listarAdministradores,
  criarAdministrador,
  loginAdmin,
  eliminarUtilizadoresNaoAdmin,
  logoutAdmin,
};
