require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");


require("./Connection/conn");

// ✅ ADD THESE TWO LINES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", require("./Routes/user"));

app.listen(4000, () => {
  console.log("Our backend is running on port 4000");
});
