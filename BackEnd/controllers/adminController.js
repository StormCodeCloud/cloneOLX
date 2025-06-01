const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const { Administrador } = require("../models");
sequelize, Sequelize.DataTypes;

// Listar todos os administradores
async function listarAdministradores(req, res) {
  try {
    const admins = await Administrador.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar administradores", error });
  }
}

// Criar um novo administrador
async function criarAdministrador(req, res) {
  const { nome_administrador, email_administrador, password_administrador } =
    req.body;
  try {
    const novoAdmin = await Administrador.create({
      nome_administrador,
      email_administrador,
      password_administrador,
    });
    res.status(201).json(novoAdmin);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar administrador", error });
  }
}

async function eliminarUtilizadoresNaoAdmin(req, res) {
  const { User } = require("../models");
  try {
    // Elimina todos os utilizadores que não são administradores
    const result = await User.destroy({
      where: {
        isAdmin: false,
      },
    });
    res
      .status(200)
      .json({ message: `${result} utilizadores eliminados com sucesso.` });
  } catch (error) {
    res.status(500).json({ message: "Erro ao eliminar utilizadores", error });
  }
}

module.exports = {
  listarAdministradores,
  criarAdministrador,
  eliminarUtilizadoresNaoAdmin,
};
