const express = require("express");

const bodyParser = require("body-parser"); //Package gére à analyser data dans corps des requêtes

const cookieParser = require("cookie-parser"); //Package qui gere les cookies

const path = require("path"); // Package qui gère le chemin des fichier

const app = express();

const connectApi = require("./config/dataBase");

const testRoute = require("./routes/test.routes");

const bookRoutes = require("./routes/book.routes");

const userRoute = require("./routes/user.routes");

const corsMiddleware = require("./middlewares/cors.middleware");

const { octetNullDetection } = require("./config/octetNullDetection");

require("dotenv").config({ path: "config/.env" });

const helmet = require("helmet");

const limiter = require("./config/rateLimit");

const jsonSerialized = require("./config/serializedJson");

const { logError, logData } = require("./config/log");

const xmlMiddleware = require("./config/xmlControl");

// ***************************************************************************************************************//
//*************************************-Connexion à Data Base MongoDb
connectApi();

// ***************************************************************************************************************//
//*************************************-Custom le Headers des requêtes!

app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

app.use(corsMiddleware);

// ************************************-Vérification des octets nuls dans l'URL
app.use(octetNullDetection);

// ************************************-analyser les données XML
app.use(xmlMiddleware);

// ************************************-Vérification des limites Requêtes / SERVEUR
app.use(limiter);

//*************************************-Récuperer la data sous forme Json
app.use(bodyParser.json()); // <= ancienne technique / new => app.use(express.json())

//************************************* Limite de taille du JSON entrant
app.use(express.json({ limit: "1mo" }));

//*************************************-Récuperer la data encodé sous forme URL
app.use(bodyParser.urlencoded({ extended: true }));

//*************************************-Récuperer la data encodé sous Cookies
app.use(cookieParser());

//*************************************-Sérializé(codé) les JSON en transit Back&Front
app.use(jsonSerialized);

//*************************************-Journal de LOG *TEST* d'information
app.use(logData);

app.use(logError);

// ***************************************************************************************************************//
//*************************************-1er ROUTES TEST :
app.use("/api/auth", testRoute);

//*************************************-ROUTES BOOK :
//app.use("/api/books", bookRoutes);
app.use("/api/books", bookRoutes);

//*************************************-ROUTES AUTHentification :
app.use("/api/auth", userRoute);

//*************************************-ROUTES lecture des IMG :
app.use("/book_picture", express.static(path.join(__dirname, "/uploads")));

// ***************************************************************************************************************//

module.exports = app;
