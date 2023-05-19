const express = require("express");

const bodyParser = require("body-parser");

// const stuffRoutes = require("./routes/stuff");

// const userRoutes = require("./routes/user");

const path = require("path");

//Connexion à Data Base MongoDb
// mongoose
//   .connect(
//     "mongodb+srv://John:doe@mon-vieux-grimoire.hamtkym.mongodb.net/dataBase",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Connexion à MongoDB réussie !"))
//   .catch((err) => console.log("Connexion à MongoDB échouée ! Erreur : " + err));

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
