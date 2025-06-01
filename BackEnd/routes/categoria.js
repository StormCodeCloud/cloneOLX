const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

// Listar todas as categorias
router.get("/", categoriaController.listarCategorias);
// Criar nova categoria
router.post("/criar", categoriaController.createAnnouncement);

module.exports = router;
