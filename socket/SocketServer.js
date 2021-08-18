const { model } = require("mongoose");
const socketIo = require("socket.io");

const users = new Map();
const usersSockets = new Map();

const SocketServer = (server) => {
  const io = socketIo(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("join", async (user, auction) => {
      let sockets = [];

      // if (users.has(user.id)) {
      //   const existingUser = users.get(user.id);
      //   existingUser.socket = [...existingUser, ...[socket.id]];
      //   users.set(user.is, existingUser);
      //   sockets = [...existingUser.sockets, ...[socket.id]];
      // } else {
      //   users.set(user.id, { id: user.id, sockets: [socket.id] });
      //   sockets.push(socket.id);
      // }

      console.log(`${user.username} Joined ${auction.name}`);

      io.to(socket.id).emit("addUser", user);
    });

    // socket.on("disconnect", () => {
    //   if (usersSockets.has(socket.id)) {
    //     const user = users.get(usersSockets.get(socket.id));
    //   }
    // });
  });
};

module.exports = SocketServer;
