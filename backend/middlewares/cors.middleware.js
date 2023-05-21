// ********************************-1e Solution-*********************************
// module.exports = (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// };

// ********************************-2e Solution-*********************************
const cors = require("cors"); // Package qui gère le CORS des en-tête

// Configurez les options CORS selon vos besoins
const corsOptions = {
  origin: "*", // Autoriser toutes les origines
  allowedHeaders:
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization", // En-têtes autorisés
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS", // Méthodes HTTP autorisées
};

// Créez le middleware CORS avec les options configurées
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
