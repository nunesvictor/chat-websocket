$(() => {
  const socket = io();
  const messageChannel = "chat-message";
  const loginChannel = "chat-login";
  let login;

  $("#form").on("submit", (e) => {
    const message = $("#msg").val();

    if (login) {
      socket.emit(messageChannel, message);
    } else {
      $("#msg-label").text("Digite a sua mensagem");
      socket.emit(loginChannel, message);
      login = message;
    }

    $("#msg").val("");
    e.preventDefault();
  });

  socket.on(messageChannel, (message) => {
    console.log(`Mensagem recebida no cliente: ${message}`);
    $("#messages").append($("<li>").text(message));
  });
});
