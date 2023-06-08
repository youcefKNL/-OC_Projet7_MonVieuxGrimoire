const bookModel = require("../models/Book.model");

// Obtenir un livre par ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookModel.findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).jsonSerialized({ error: "Livre non trouvé" });
    }
    res.status(200).jsonSerialized(book);
  } catch (error) {
    res
      .status(500)
      .jsonSerialized({ error: "Erreur lors de la récupération du livre" });
  }
};
