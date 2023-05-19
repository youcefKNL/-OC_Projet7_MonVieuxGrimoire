const http = require("http");
const app = require("./config/app");
const connectApi = require("./config/dataBase");

// ***************************************************************************
//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10); // Conversion de la valeur en un entier (nombre de port)

  if (isNaN(port)) {
    // Vérification si la conversion a échoué
    return val; // Retourne la valeur d'origine si ce n'est pas un nombre
  }
  if (port >= 0) {
    // Vérification si le nombre de port est valide
    return port; // Retourne le nombre de port si c'est valide
  }
  return false; // Retourne false si le nombre de port est non valide
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// ***************************************************************************
//la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    // Vérification si l'erreur n'est pas liée à l'appel système "listen"
    throw error; // Lancer l'erreur si ce n'est pas lié à "listen"
  }
  const address = server.address(); // Obtention de l'adresse à laquelle le serveur est lié
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port; // Construction de la chaîne de caractères pour l'affichage

  switch (
    error.code // Traitement des différents codes d'erreur possibles
  ) {
    case "EACCES": // Cas d'erreur "EACCES" - privilèges insuffisants
      console.error(bind + " requires elevated privileges."); // Affichage du message d'erreur correspondant
      process.exit(1); // Terminer le processus avec un code d'erreur
      break;
    case "EADDRINUSE": // Cas d'erreur "EADDRINUSE" - port déjà utilisé
      console.error(bind + " is already in use."); // Affichage du message d'erreur correspondant
      process.exit(1); // Terminer le processus avec un code d'erreur: une fin anormale(convention courante)
      break;
    default: // Cas d'erreur par défaut
      throw error; // Lancer l'erreur par défaut pour la traiter ailleurs
  }
};

const server = http.createServer(app);

server.on("error", errorHandler); //Capture l erreur qui rentre en paramètre de la fonction pour traitement

//un écouteur d'évènements  consignant le port ou le canal
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Serveur en éxécution sur le " + bind);
});

server.listen(port); // Mettre en route le serveur sur port spécifié
connectApi(); // Connexion à Base de donnée MongoDb Atlas Free
