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
        .json({ message: "L'utilisateur a déjà noté ce livre." });
    } else {
      // Vérifiez si l'utilisateur a déjà une notation et mettez à jour cette notation
      const existingRatingIndex = book.ratings.findIndex(
        (r) => r.userId === userId
      );
      if (existingRatingIndex !== -1) {
        book.ratings[existingRatingIndex].grade = rating;
      } else {
        // Si l'utilisateur n'a pas encore noté le livre, ajoutez une nouvelle notation
        book.ratings.push({ userId, grade: rating });
      }
    }

    // Mettez à jour la note moyenne "averageRating"
    const totalRatings = book.ratings.length;

    // Methode Js addition
    const additionRatings = book.ratings.reduce(
      (somme, note) => somme + note.grade,
      0
    );
    book.averageRating = additionRatings / totalRatings;

    // Sauvegardez les modifications du livre
    await book.save();

    console.log("Note ajoutée avec succès à la moyenne!");
    // Renvoyez le livre mis à jour en réponse
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la notation du livre.",
    });
  }
};
