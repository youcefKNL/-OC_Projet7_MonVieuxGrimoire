const express = require("express");

const bodyParser = require("body-parser"); //Package gére à analyser data dans corps des requêtes

const path = require("path"); // Package qui gère le chemin des fichier

const app = express();

const connectApi = require("./config/dataBase");

const testRoute = require("./routes/test.routes");

const bookRoutes = require("./routes/book.routes");

const userRoute = require("./routes/user.routes");

const corsMiddleware = require("./middlewares/cors.middleware");

const { octetNullDetection } = require("./config/octetNullDetection");

require("dotenv").config({ path: "config/.env" });

// ***************************************************************************************************************//
//*************************************-Connexion à Data Base MongoDb
connectApi();

// ***************************************************************************************************************//
//*************************************-Custom le Headers des requêtes!

app.use(corsMiddleware);

// ************************************-Vérification des octets nuls dans l'URL
app.use(octetNullDetection);

//*************************************-Récuperer la data sous forme Json
app.use(bodyParser.json()); // <= ancienne technique / new => app.use(express.json())

//*************************************-Récuperer la data encodé sous forme URL
app.use(bodyParser.urlencoded({ extended: true }));

// ***************************************************************************************************************//
//*************************************-1er ROUTES TEST :
app.use("/api/auth", testRoute);

//*************************************-ROUTES BOOK :
app.use("/api/books", bookRoutes);

//*************************************-ROUTES AUTHentification :
app.use("/api/auth", userRoute);

//*************************************-ROUTES lecture des IMG :
app.use("/book_picture", express.static(path.join(__dirname, "/uploads")));

// ***************************************************************************************************************//

module.exports = app;
