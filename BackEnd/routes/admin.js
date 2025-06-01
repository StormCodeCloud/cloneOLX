const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Listar todos os administradores
router.get("/", adminController.listarAdministradores);
// Criar novo administrador
router.post("/criar", adminController.criarAdministrador);
// Login de administrador
router.post("/login", adminController.loginAdmin);
// Eliminar utilizadores não admin
router.delete(
  "/eliminar-nao-admin",
  adminController.eliminarUtilizadoresNaoAdmin
);

module.exports = router;
