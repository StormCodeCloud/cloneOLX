module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      id_imagem: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      caminho_ficheiro: {
        type: DataTypes.TEXT,
        allowNull: false,
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
  return { Mensagem, Imagem };
};
