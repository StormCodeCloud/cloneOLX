module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      id_mensagem: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_remetente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_destinatario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_anuncio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conteudo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      data_envio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "mensagem",
      timestamps: false,
    }
  );

  // Associações podem ser definidas no index dos models ou aqui, se desejar
  return Mensagem;
};
