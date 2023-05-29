const http = require("http"); // Package  création server et gère requête et response http

const app = require("./app");

const serverController = require("./middlewares/server.middleware");

const port = serverController.normalizePort(process.env.PORT || "5000");

app.set("port", port);

const server = http.createServer(app);

// *********************************************************************************

//Capture l erreur qui rentre en paramètre de la fonction pour traitement
server.on("error", serverController.errorHandler);
//un écouteur d'évènements  consignant le port ou le canal
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Serveur en éxécution sur le " + bind);
  console.log("Simulation serveur URL: http://localhost:" + port);
});
// Mettre en route le serveur sur port spécifié
server.listen(port);
