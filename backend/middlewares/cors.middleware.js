const cors = require("cors"); // Package qui gère le CORS des en-tête

// Configurez les options CORS selon vos besoins
const corsOptions = {
  // Autoriser toutes les origines
  origin: [
    "http://localhost:3000",
    "https://youcefknl.github.io/OC_Projet7_MonVieuxGrimoire",
  ],
  // En-têtes autorisés
  allowedHeaders:
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  // Méthodes HTTP autorisées
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
};

// Créez le middleware CORS avec les options configurées
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
