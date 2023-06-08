const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  // Durée de la fenêtre en millisecondes
  windowMs: 15 * 60 * 1000, // = 15 min

  // Nombre maximal de requêtes autorisées dans la fenêtre
  max: 50,

  // Message d'erreur à envoyer lorsque la limite est dépassée
  message: "Trop de requêtes effectuées. Veuillez réessayer plus tard.",
});

module.exports = limiter;
