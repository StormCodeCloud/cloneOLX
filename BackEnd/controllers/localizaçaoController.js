const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const { Localizacao } = require("../models");

// Listar todas as localizações
async function listarLocalizacoes(req, res) {
  try {
    console.log("Tentando buscar localizações...");
    const localizacoes = await Localizacao.findAll();
    console.log("Localizações encontradas:", localizacoes);
    res.status(200).json(localizacoes);
  } catch (error) {
    console.error("Erro detalhado ao buscar localizações:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Erro ao buscar localizações",
      error: error.message,
      stack: error.stack,
    });
  }
}

// Adicionar uma nova localização
async function adicionarLocalizacao(req, res) {
  console.log("Body recebido:", req.body);
  const { distrito, concelho, freguesia } = req.body;

  if (!distrito || !concelho || !freguesia) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios",
      camposRecebidos: { distrito, concelho, freguesia },
    });
  }

  try {
    console.log("Tentando criar localização com:", {
      distrito,
      concelho,
      freguesia,
    });
    const novaLocalizacao = await Localizacao.create({
      distrito,
      concelho,
      freguesia,
    });
    console.log("Localização criada com sucesso:", novaLocalizacao);
    res.status(201).json(novaLocalizacao);
  } catch (error) {
    console.error("Erro detalhado ao adicionar localização:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Erro ao adicionar localização",
      error: error.message,
      stack: error.stack,
    });
  }
}

module.exports = {
  listarLocalizacoes,
  adicionarLocalizacao,
};
