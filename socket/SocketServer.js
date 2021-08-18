const { model } = require("mongoose");
const socketIo = require("socket.io");

const SocketServer = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    socket.on("join", async (user) => {
      console.log("New User Joined ", user.username);
    });
  });
};

module.exports = SocketServer;
