const mongoose = require("mongoose");

const connectDataBase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://John:doe@mon-vieux-grimoire.hamtkym.mongodb.net/dataBase",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connexion à MongoDB réussie !");
  } catch (err) {
    console.log("Connexion à MongoDB échouée ! Erreur : " + err);
  }
};

module.exports = connectDataBase;
