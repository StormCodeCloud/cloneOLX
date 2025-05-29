const express = require("express");
const router = express.Router();
const anuncioController = require("../controllers/anuncioController");

// Criar anúncio (protegido)
router.post(
  "/criar",
  anuncioController.autenticarJWT,
  anuncioController.criarAnuncio
);

// Listar todos os anúncios (home page)
router.get("/", anuncioController.listarAnuncios);

// Backoffice admin - anúncios
router.get("/", anuncioController.listarAnuncios);
router.put("/:id", anuncioController.editarAnuncio);
router.delete("/:id", anuncioController.excluirAnuncio);

module.exports = router;
