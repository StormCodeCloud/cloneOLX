const express = require("express");
const router = express.Router();
const mensagemController = require("../controllers/mensagemController");

// Enviar mensagem
router.post("/enviar", mensagemController.enviarMensagem);
// Listar mensagens entre dois utilizadores para um anúncio
router.get("/listar", mensagemController.listarMensagens);

module.exports = router;
