const bookModel = require("../models/Book.model");

// Obtenir les 3 livres avec la meilleure note moyenne
exports.getTopBooks = async (req, res) => {
  try {
    const books = await bookModel.find().sort({ averageRating: -1 }).limit(3);
    res.status(200).jsonSerialized(books);
  } catch (error) {
    res
      .status(500)
      .jsonSerialized({ error: "Erreur lors de la récupération des livres" });
    console.log("Erreur:", error);
  }
};
