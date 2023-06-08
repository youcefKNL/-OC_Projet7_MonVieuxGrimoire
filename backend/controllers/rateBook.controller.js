const Book = require("../models/Book.model");

exports.rateBook = async (req, res) => {
  const { id } = req.params;
  const { userId, rating } = req.body;

  try {
    // Vérifiez si l'utilisateur a déjà noté ce livre
    const book = await Book.findById(id);
    const alreadyRated = book.ratings.find((req) => req.userId === userId);

    if (alreadyRated) {
      return res
        .status(400)
        .jsonSerialized({ message: "L'utilisateur a déjà noté ce livre." });
    }
    // Vérifiez si la note est valide (entre 1 et 5)
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "La note doit être comprise entre 1 et 5." });
    }
    // Ajoutez la nouvelle notation au tableau "ratings"
    book.ratings.push({ userId, grade: rating });

    // Mettez à jour la note moyenne "averageRating"
    const totalRatings = book.ratings.length;
    const sumRatings = book.ratings.reduce((sum, note) => sum + note.grade, 0);
    book.averageRating = Math.round(sumRatings / totalRatings);

    // Sauvegardez les modifications du livre
    await book.save();

    console.log("Note ajoutée avec succès à la moyenne !");
    // Renvoyez le livre mis à jour en réponse
    res.jsonSerialized(book);
  } catch (error) {
    console.error(error);
    res.status(500).jsonSerialized({
      message: "Une erreur est survenue lors de la notation du livre.",
    });
  }
};
