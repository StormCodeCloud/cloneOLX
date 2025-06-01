module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define(
    "Utilizador",
    {
      id_utilizador: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id_utilizador",
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "nome_utilizador",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: "email_utilizador",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password_utilizador",
      },
      telefone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: "telefone",
      },
      data_registo: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "data_registo",
      },
      estado_conta: {
        type: DataTypes.ENUM("ativo", "suspenso", "eliminado"),
        allowNull: false,
        defaultValue: "ativo",
        field: "estado_conta",
      },
      id_localizacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_localizacao",
      },
    },
    {
      tableName: "utilizador",
      timestamps: false,
    }
  );
  return Utilizador;
};
