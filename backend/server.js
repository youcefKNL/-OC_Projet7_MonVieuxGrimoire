// const express = require("express");
// const port = 5000;
// const app = express();

// app.listen(port, () => console.log("Le serveur a démarré au port" + port));

//***************************************************************** */

const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Voilà la réponse du serveur !");
});

server.listen(process.env.PORT || 3000);
