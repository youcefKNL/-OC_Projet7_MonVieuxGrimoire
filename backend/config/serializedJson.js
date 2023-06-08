const serialize = require("serialize-javascript"); //Package qui sécurisé les JSON (sérialiser) des malwares

// Middleware pour sérialiser les réponses JSON
const jsonSerializeMiddleware = (req, res, next) => {
  // Remplacez "data" par votre objet ou tableau de données JSON que vous souhaitez sérialiser
  res.jsonSerialized = (data) => {
    const serializedData = serialize(data);
    res.setHeader("Content-Type", "application/json");
    res.send(serializedData);
  };
  next();
};

module.exports = jsonSerializeMiddleware;
