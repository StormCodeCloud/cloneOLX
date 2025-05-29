const { Sequelize } = require("sequelize");
const sequelize = require("../server").sequelize;
const mensagem = require("../models/mesangem")(sequelize, Sequelize.DataTypes);

// Enviar mensagem
async function enviarMensagem(req, res) {
  const { id_remetente, id_destinatario, id_anuncio, conteudo } = req.body;
  try {
    const novaMensagem = await mensagem.create({
      id_remetente,
      id_destinatario,
      id_anuncio,
      conteudo,
    });
    res.status(201).json(novaMensagem);
  } catch (error) {
    res.status(500).json({ message: "Erro ao enviar mensagem", error });
  }
}

// Listar mensagens entre dois utilizadores para um anúncio
async function listarMensagens(req, res) {
  const { id_remetente, id_destinatario, id_anuncio } = req.query;
  try {
    const mensagens = await mensagem.findAll({
      where: {
        id_anuncio,
        [Sequelize.Op.or]: [
          { id_remetente, id_destinatario },
          { id_remetente: id_destinatario, id_destinatario: id_remetente },
        ],
      },
      order: [["data_envio", "ASC"]],
    });
    res.status(200).json(mensagens);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar mensagens", error });
  }
}

module.exports = {
  enviarMensagem,
  listarMensagens,
};
