const express = require("express");
const router = express.Router();
const historicoController = require("../controllers/historicoControlller");

// Listar todos os históricos
router.get("/", historicoController.listarHistoricos);
// Adicionar histórico de visualização
router.post("/adicionar", historicoController.adicionarHistorico);

module.exports = router;
