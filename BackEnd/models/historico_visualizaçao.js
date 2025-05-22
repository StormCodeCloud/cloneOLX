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
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }, //FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador)
      id_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "utilizador",
          key: "id_utilizador",
        },
      }, //FOREIGN KEY (id_anuncio) REFERENCES anuncio(id_anuncio)
      id_anuncio: {
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
