const mongoose = require("mongoose");

const connectDB = async () => {
  const uri =
    "mongodb+srv://admin:ismael12345@cluster0.twikm.mongodb.net/myFirstDatabase?retryWrites=true";

  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
};

module.exports = connectDB;
