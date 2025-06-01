module.exports = (sequelize, DataTypes) => {
  const Imagem = sequelize.define(
    "Imagem",
    {
      id_imagem: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      caminho_ficheiro: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      id_anuncio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "imagem",
      timestamps: false,
    }
  );
  return Imagem;
};
