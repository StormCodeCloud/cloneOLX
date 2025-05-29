const express = require("express");
const router = express.Router();
const utilizadoresController = require("../controllers/utilizadoresController");

router.post("/registar", utilizadoresController.registarUtilizador);
router.post("/login", utilizadoresController.loginUtilizador);

module.exports = router;
