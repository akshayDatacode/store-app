const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRoutes = require("./routes/indexRoute");
const cartRoutes = require("./routes/cartRoute");
const userRoutes = require("./routes/userRoute");

const app = express();

//usages
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRoutes);
//using routes
app.use("/api", indexRoutes);
app.use("/api/cart", cartRoutes);

// // TOKEN AUTHENTICATION- ALL THE ROUTES WRITTEN BELOW THIS WILL NEED TOKEN TO BE SENT in request headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });

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
