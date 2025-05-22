module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      id_localizacao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      distrito: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      concelho: {
        type: DataTypes.TEXT,
        allowNull: false,
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
