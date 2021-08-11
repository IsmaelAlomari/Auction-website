const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const app = express();
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const db = mongoose.connection;
const port = 5000;
const usersRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

//
app.use(express.json());
app.use("/", usersRoutes);
app.use("/", categoryRoutes);

app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

const uri =
  "mongodb+srv://admin:ismael12345@cluster0.twikm.mongodb.net/myFirstDatabase?retryWrites=true";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
