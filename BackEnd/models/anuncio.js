module.exports = (sequelize, DataTypes) => {
  const Anuncio = sequelize.define(
    "Anuncio",
    {
      id_anuncio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      data_publicacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      estado: {
        type: DataTypes.ENUM("ativo", "inativo", "vendido"),
        defaultValue: "ativo",
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
    },
    {
      tableName: "anuncio",
      timestamps: false,
    }
  );
  return Anuncio;
};
