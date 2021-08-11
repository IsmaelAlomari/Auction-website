const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
const db = mongoose.connection;
const port = 5000;
const usersRoutes = require("./routes/user");

//
app.use(express.json());
app.use("/", usersRoutes);

const uri =
  "mongodb+srv://admin:ismael12345@cluster0.twikm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
