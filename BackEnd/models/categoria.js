module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define(
    "Categoria",
    {
      id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_categoria: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      tableName: "categoria",
      timestamps: false,
    }
  );
  return Categoria;
};
