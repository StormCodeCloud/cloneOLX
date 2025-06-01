const express = require("express");
const router = express.Router();
const utilizadoresController = require("../controllers/utilizadoresController");

// Frontoffice - utilizadores
router.post("/registar", utilizadoresController.registarUtilizador);
router.post("/login", utilizadoresController.loginUtilizador);
router.post("/logout", utilizadoresController.logoutUtilizador);

// Backoffice admin - utilizadores
router.get("/", utilizadoresController.listarUtilizadores);
router.put("/:id", utilizadoresController.editarUtilizador);
router.delete("/:id", utilizadoresController.excluirUtilizador);

module.exports = router;
