const mongoose = require("mongoose");

const connectApi = async () => {
  let attempts = 0;

  while (attempts < 5) {
    try {
      await mongoose.connect(process.env.DB_USER_PASS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connexion à la base de données MongoDB réussie !");
      break;
    } catch (err) {
      attempts++;
      console.log(
        "Tentative de connexion à la base de données MongoDB échouée ! Erreur : " +
          err
      );
      if (attempts < 5) {
        console.log(`Nouvelle tentative dans 3 secondes... (${attempts}/5)`);
        await new Promise((resolve) => setTimeout(resolve, 3000)); //3s
      } else {
        console.log("Échec de la connexion après 5 tentatives !");
      }
    }
  }
};

module.exports = connectApi;
