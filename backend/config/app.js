const express = require("express");

const bodyParser = require("body-parser"); //Package gére à analyser data dans corps des requêtes

const app = express();

const connectApi = require("../config/dataBase");

const testRoute = require("../routes/test.routes");

const bookRoutes = require("../routes/book.routes");

const userRoute = require("../routes/user.routes");

//const corsController = require("../middleware/cors.middleware");

const corsMiddleware = require("../middlewares/cors.middleware");

//const path = require("path");

// ***************************************************************************************************************//
//*************************************-Connexion à Data Base MongoDb
connectApi();

// ***************************************************************************************************************//
//*************************************-Custom le Headers des requêtes!
//app.use(corsController);
app.use(corsMiddleware);

//*************************************-Récuperer la data sous forme Json
app.use(bodyParser.json());

//*************************************-Récuperer la data encodé sous forme URL
app.use(bodyParser.urlencoded({ extended: true }));

// ***************************************************************************************************************//
//*************************************-1er ROUTES TEST :
app.use("/api/auth", testRoute);

//*************************************-ROUTES Book :
app.use("/api/books", bookRoutes);

//*************************************-ROUTES Authentification :
app.use("/api/auth", userRoute);

// app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
