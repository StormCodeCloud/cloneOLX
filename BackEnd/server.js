const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const port = 3000;
const app = express();

// Configuração do Sequelize
const sequelize = new Sequelize("cloneOLX", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

// Testar conexão
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão Sequelize estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MySQL via Sequelize:", err);
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

server.listen(port, () => {
  console.log(`http://localhost:${port}.`);
});
