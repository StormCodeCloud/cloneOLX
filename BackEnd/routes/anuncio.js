const express = require("express");
const router = express.Router();
const anuncioController = require("../controllers/anuncioController");

// Listar todos os anúncios (public)
router.get("/", anuncioController.listarAnuncios);

// Criar anúncio (requer autenticação)
router.post(
  "/criar",
  anuncioController.autenticarJWT,
  anuncioController.criarAnuncio
);

// Editar anúncio (requer autenticação)
router.put(
  "/:id",
  anuncioController.autenticarJWT,
  anuncioController.editarAnuncio
);

// Excluir anúncio (requer autenticação)
router.delete(
  "/:id",
  anuncioController.autenticarJWT,
  anuncioController.excluirAnuncio
);

module.exports = router;
