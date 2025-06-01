const express = require("express");
const router = express.Router();
const localizacaoController = require("../controllers/localizaçaoController");

// Listar todas as localizações
router.get("/", localizacaoController.listarLocalizacoes);
// Adicionar nova localização
router.post("/adicionar", localizacaoController.adicionarLocalizacao);

module.exports = router;
