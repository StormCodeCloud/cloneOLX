const multer = require("multer");
const path = require("path");
const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const { Imagem } = require("../models");
sequelize, Sequelize.DataTypes;

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // pasta onde as imagens serão salvas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Listar todas as imagens
async function listarImagens(req, res) {
  try {
    const imagens = await Imagem.findAll();
    res.status(200).json(imagens);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar imagens", error });
  }
}

// Adicionar uma imagem
async function adicionarImagem(req, res) {
  const { id_anuncio, url_imagem } = req.body;
  try {
    const novaImagem = await Imagem.create({
      id_anuncio,
      url_imagem,
    });
    res.status(201).json(novaImagem);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar imagem", error });
  }
}

// Controller para upload de imagem
async function uploadImagem(req, res) {
  const { id_anuncio } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "Nenhuma imagem enviada." });
  }
  try {
    const novaImagem = await Imagem.create({
      caminho_ficheiro: req.file.path,
      id_anuncio,
    });
    res
      .status(201)
      .json({ message: "Imagem enviada com sucesso!", imagem: novaImagem });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar imagem", error });
  }
}

module.exports = {
  listarImagens,
  adicionarImagem,
  upload,
  uploadImagem,
};
