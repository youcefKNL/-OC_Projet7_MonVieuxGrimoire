const bookModel = require("../models/Book.model");

// Obtenir tous les livres de la base de données
exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des livres" });
  }
};

// Obtenir un livre par ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookModel.findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ error: "Livre non trouvé" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du livre" });
  }
};

// Obtenir les 3 livres avec la meilleure note moyenne
exports.getTop3Books = async (req, res) => {
  try {
    const books = await bookModel.find().sort({ rating: -1 }).limit(3);
    if (books.length === 0) {
      return res.status(404).json({ error: "Aucun livre trouvé" });
    }
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des livres" });
  }
};
