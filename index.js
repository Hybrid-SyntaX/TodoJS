const express = require("express");
const mongoose = require("mongoose");
const keys = require("./configs/keys");
const bodyParser = require("body-parser");

require("./models/TodoTask");

mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.json());

//Include controllers
require("./controllers/tasksController")(app);

//Set up production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Set up server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
