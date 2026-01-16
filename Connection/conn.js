const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/youtubebackend")
  .then(() => console.log("Db Connection Succesful!"))
  .catch((err) => {
    console.log(err);
  });
