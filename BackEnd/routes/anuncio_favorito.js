const express = require("express");
const router = express.Router();
const anuncioFavController = require("../controllers/anuncio_favController");

// Seguir anúncio
router.post("/seguir", anuncioFavController.seguirAnuncio);
// Desseguir anúncio
router.delete("/desseguir", anuncioFavController.desseguirAnuncio);

module.exports = router;
