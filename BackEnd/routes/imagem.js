const express = require("express");
const router = express.Router();
const imagemController = require("../controllers/imagemController");

// Upload de imagem para um anúncio
router.post(
  "/upload",
  imagemController.upload.single("imagem"),
  imagemController.uploadImagem
);

module.exports = router;
