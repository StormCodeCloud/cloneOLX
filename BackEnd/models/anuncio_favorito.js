const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const AnuncioFavorito = sequelize.define(
    "AnuncioFavorito",
    {
      id_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_anuncio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      data_adicao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "anuncio_favorito",
      timestamps: false,
    }
  );
  return AnuncioFavorito;
};
