const mongoose = require("mongoose");

const express = require("express");

const bodyParser = require("body-parser");

// const stuffRoutes = require("./routes/stuff");

// const userRoutes = require("./routes/user");

const path = require("path");

mongoose
  .connect(
    "mongodb+srv://sefyu:Sefyu+91@cluster0.6pejpti.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// *****************************************************************
// accept toute les requêtes à delete après juste test 1er fois server
app.use((req, res) => {
  res.json({ message: "Votre requête TEST Postman a bien été reçue !" });
});
// ***************************************************************

//Custom le Headers des requêtes!
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

// app.use("/api/stuff", stuffRoutes);

// app.use("/api/stuff", stuffRoutes);
// app.use("/api/auth", userRoutes);

// app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
