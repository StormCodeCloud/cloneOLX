module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      id_anuncio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.TEXT,
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
        //FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categoria",
          key: "id_categoria",
        },
      },
      id_anuncio: {
        //FOREIGN KEY (id_localizacao) REFERENCES localizacao(id_localizacao)
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "localizacao",
          key: "id_localizacao",
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
