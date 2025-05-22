module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_categoria: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "mensagem",
      timestamps: false,
    }
  );
  return Mensagem;
};
