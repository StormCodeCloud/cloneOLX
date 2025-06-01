const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API Clone OLX",
    description:
      "API REST para o clone do OLX com autenticação, chat e upload de imagens",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Token JWT no formato: Bearer {token}",
    },
  },
  definitions: {
    Utilizador: {
      $nome: "João Silva",
      $email: "joao@email.com",
      $password: "senha123",
      telefone: "912345678",
      $id_localizacao: 1,
    },
    LoginInput: {
      $email: "joao@email.com",
      $password: "senha123",
    },
    Anuncio: {
      $titulo: "iPhone 13 Pro Max",
      $descricao: "iPhone 13 Pro Max 256GB, cor grafite, estado novo",
      $preco: 899.99,
      $id_categoria: 1,
      $id_localizacao: 1,
    },
    Administrador: {
      $nome_administrador: "Admin",
      $email_administrador: "admin@cloneolx.com",
      $password_administrador: "senha456",
    },
    Categoria: {
      $nome_categoria: "Tecnologia",
    },
    Localizacao: {
      $distrito: "Porto Santo",
      $concelho: "Porto Santo",
      $freguesia: "Zona do Tanque",
    },
    Error: {
      message: "Mensagem de erro",
      error: "Detalhes do erro",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = [
  "./routes/utilizador.js",
  "./routes/anuncio.js",
  "./routes/admin.js",
  "./routes/categoria.js",
  "./routes/localizacao.js",
  "./routes/imagem.js",
  "./routes/anuncio_favorito.js",
  "./routes/mensagem.js",
];

// Gerar o swagger.json
swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Documentação Swagger gerada com sucesso!");
});
