let users = [];

const SocketServer = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", async (user) => {
      let roomId = "x";

      users.push({
        socketId: socket.id,
        username: user.username,
        room: roomId,
      });

      socket.join(roomId);
      socket.to(roomId).emit("message", users);
      socket.emit("message", users);

      console.log(`${user.username} Joined `);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, users);
      let myUser = users.find((user) => user.socketId == socket.id);
      if (myUser) {
        users = users.filter((user) => user.socketId !== socket.id);
        socket.to(myUser.room).emit("message", users);
      }
    });
  });
};

module.exports = SocketServer;
