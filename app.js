const express = require("express");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const http = require("http");
const socketIo = require("socket.io");
const SocketServer = require("./socket/SocketServer");

// Mongo DB
const connectDB = require("./db");
connectDB();

//Routes
const usersRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const auctionRoutes = require("./routes/auction");
const walletRoutes = require("./routes/wallet");

//Creat App Instence
const app = express();

app.use(cors());

// Socket
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });
SocketServer(io);

app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/media", express.static(path.join(__dirname, "media")));

//Routes
app.use(usersRoutes);
app.use(categoryRoutes);
app.use(auctionRoutes);
app.use(walletRoutes);

// Path not Found Middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
