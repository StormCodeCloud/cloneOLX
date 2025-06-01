const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 3000;
const app = express();
const fs = require("fs");
const path = require("path");
const sequelize = require("./db_sequelize");

// Configuração do Swagger
const swaggerUi = require("swagger-ui-express");
// Tentar carregar o swagger apenas se o arquivo existir
const swaggerPath = path.join(__dirname, "swagger-output.json");
if (fs.existsSync(swaggerPath)) {
  const swaggerFile = require("./swagger-output.json");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

// Testar conexão
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // ajuste conforme necessário para produção
  },
});

// Evento de conexão WebSocket
io.on("connection", (socket) => {
  console.log("Novo usuário conectado ao chat!", socket.id);

  // Recebe mensagem do cliente e retransmite para o destinatário
  socket.on("chat:send", (data) => {
    // data deve conter: { id_remetente, id_destinatario, id_anuncio, conteudo }
    io.emit(`chat:receive:${data.id_destinatario}`, data); // envia para o destinatário
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

//routes
const anuncioRoutes = require("./routes/anuncio");
app.use("/api/anuncio", anuncioRoutes);

const utilizadorRoutes = require("./routes/utilizador");
app.use("/api/utilizador", utilizadorRoutes);

const anuncioFavoritoRoutes = require("./routes/anuncio_favorito");
app.use("/api/anuncio-favorito", anuncioFavoritoRoutes);

const imagemRoutes = require("./routes/imagem");
app.use("/api/imagem", imagemRoutes);

const categoriaRoutes = require("./routes/categoria");
app.use("/api/categoria", categoriaRoutes);

const localizacaoRoutes = require("./routes/localizacao");
app.use("/api/localizacao", localizacaoRoutes);

const historicoRoutes = require("./routes/historico");
app.use("/api/historico", historicoRoutes);

const mensagemRoutes = require("./routes/mensagem");
app.use("/api/mensagem", mensagemRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

server.listen(port, () => {
  console.log(`http://localhost:${port}.`);
});
