const mongoose = require("mongoose");

const connectApi = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://John:doe@mon-vieux-grimoire.hamtkym.mongodb.net/dataBase",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connexion à la base de donnée MongoDB réussie !");
  } catch (err) {
    console.log(
      "Connexion à la base de donnée MongoDB échouée ! Erreur : " + err
    );
  }
};

module.exports = connectApi;
