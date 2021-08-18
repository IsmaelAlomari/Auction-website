const { model } = require("mongoose");
const socketIo = require("socket.io");

const SocketServer = (server) => {
  const io = socketIo(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("join", async (user, auction) => {
      console.log(`${user.username} Joined ${auction.name}`);
    });
  });
};

module.exports = SocketServer;
