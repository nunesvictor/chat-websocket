const express = require("express");
const app = express();

// HTTP server config
const http = require("http").Server(app);
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.get("/", (_, res) => res.sendFile(`${__dirname}/index.html`));
http.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));

// Socket.IO server config
const websocket = require("socket.io")(http);

websocket.on("connect", (socket) => {
  const messageChannel = "chat-message";
  const loginChannel = "chat-login";

  console.log(`Cliente ${socket.id} se conectou!`);

  socket.on(messageChannel, (message) => {
    const msg = `Mensagem recebida de ${socket.username}: ${message}`;

    websocket.emit(messageChannel, msg);
    console.log(msg);
  });

  socket.on(loginChannel, (username) => {
    const msg = `${username} entrou no chat!`;

    socket.username = username;
    websocket.emit(messageChannel, msg);
    console.log(msg);
  });
});
