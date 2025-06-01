const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "administrador",
    {
      id_administrador: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_administrador: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email_administrador: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password_administrador: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "administrador",
      timestamps: false,
    }
  );
  return admin;
};
