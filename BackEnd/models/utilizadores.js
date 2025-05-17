module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define(
    "Utilizador",
    {
      id_utilizador: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      telefone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      data_registo: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      estado_conta: {
        type: DataTypes.ENUM("ativo", "suspenso", "banido"),
        allowNull: false,
        defaultValue: "ativo",
      },
    },
    {
      tableName: "utilizador",
      timestamps: false,
    }
  );

  return Utilizador;
};
