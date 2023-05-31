const Book = require("../models/Book.model");

exports.rateBook = async (req, res) => {
  const { id } = req.params;
  const { userId, rating } = req.body;

  try {
    // Vérifiez si l'utilisateur a déjà noté ce livre
    const book = await Book.findById(id);
    const alreadyRating = book.ratings.find((req) => req.userId === userId);
    if (alreadyRating) {
      // return res
      //   .status(400)
      //   .json({ message: "L'utilisateur a déjà noté ce livre." });
      // Si l'utilisateur a déjà noté le livre, mettez à jour sa note
      existingRating.grade = rating;
    } else {
      // Si l'utilisateur n'a pas encore noté le livre, ajoutez une nouvelle notation
      book.ratings.push({ userId, grade: rating });
    }

    // Vérifiez si la note est valide (entre 0 et 5)
    if (rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ message: "La note doit être comprise entre 0 et 5." });
    }

    // Ajoutez la nouvelle notation au tableau "ratings"
    book.ratings.push({ userId, grade: rating });

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

    // Renvoyez le livre mis à jour en réponse
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la notation du livre.",
    });
  }
};
