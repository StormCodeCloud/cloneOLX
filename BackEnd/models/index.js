// models/index.js
const sequelize = require("../db_sequelize");
const { DataTypes } = require("sequelize");

const Utilizador = require("./utilizadores")(sequelize, DataTypes);
const Anuncio = require("./anuncio")(sequelize, DataTypes);
const Categoria = require("./categoria")(sequelize, DataTypes);
const Imagem = require("./imagem")(sequelize, DataTypes);
const AnuncioFavorito = require("./anuncio_favorito")(sequelize, DataTypes);
const Localizacao = require("./localizacao")(sequelize, DataTypes);
const Administrador = require("./administrador")(sequelize, DataTypes);

// Associações
Utilizador.hasMany(Anuncio, { foreignKey: "id_utilizador" });
Anuncio.belongsTo(Utilizador, { foreignKey: "id_utilizador" });

Anuncio.hasMany(Imagem, { foreignKey: "id_anuncio" });
Imagem.belongsTo(Anuncio, { foreignKey: "id_anuncio" });

Utilizador.belongsToMany(Anuncio, {
  through: AnuncioFavorito,
  as: "Favoritos",
  foreignKey: "id_utilizador",
  otherKey: "id_anuncio",
});
Anuncio.belongsToMany(Utilizador, {
  through: AnuncioFavorito,
  as: "Seguidores",
  foreignKey: "id_anuncio",
  otherKey: "id_utilizador",
});

module.exports = {
  sequelize,
  Utilizador,
  Anuncio,
  Categoria,
  Imagem,
  AnuncioFavorito,
  Localizacao,
  Administrador,
};
