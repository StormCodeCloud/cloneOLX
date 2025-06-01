module.exports = (sequelize, DataTypes) => {
  const Localizacao = sequelize.define(
    "Localizacao",
    {
      id_localizacao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      distrito: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      concelho: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      tableName: "localizacao",
      timestamps: false,
    }
  );
  return Localizacao;
};
