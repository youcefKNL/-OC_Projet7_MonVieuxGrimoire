const bookModel = require("../models/Book.model");

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
