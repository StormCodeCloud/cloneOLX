const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      id_visualizacao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_anuncio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data_visualizacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      id_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_localizacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_utilizador: {
        //FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador)
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "utilizador",
          key: "id_utilizador",
        },
      },
      id_anuncio: {
        //FOREIGN KEY (id_anuncio) REFERENCES anuncio(id_anuncio)
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "anuncio",
          key: "id_anuncio",
        },
      },
    },
    {
      tableName: "mensagem",
      timestamps: false,
    }
  );
  return Mensagem;
};
