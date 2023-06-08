const bookModel = require("../models/Book.model");

// Obtenir tous les livres de la base de données
exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find().sort({ averageRating: -1 }); //Trié par le best Rating
    res.status(200).jsonSerialized(books);
  } catch (error) {
    res
      .status(500)
      .jsonSerialized({ error: "Erreur lors de la récupération des livres" });
  }
};
