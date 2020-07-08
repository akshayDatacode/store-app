const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRoutes = require("./routes/indexRoute");

const app = express();

//usages
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//using routes
app.use("/api", indexRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/store", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Server has started.......");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
