const bookModel = require("../models/Book.model");

// Obtenir tous les livres de la base de données
exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find().sort({ averageRating: -1 }); //Trié par le best Rating
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des livres" });
  }
};
