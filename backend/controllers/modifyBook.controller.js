const bookModel = require("../models/Book.model");

exports.modifyBook = (req, res) => {
  const { id } = req.params;
  // vérifie si un fichier a été inclus dans la requête.
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),

        imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  //  supprime la clé "_userId" de l'objet "bookObject"=> garantit que l'utilisateur ne peut pas modifier cette clé.
  delete bookObject._userId;
  bookModel
    .findById(id)
    .then((book) => {
      // vérifie si l'utilisateur est autorisé à modifier cet objet
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "Requête non autorisée !!" });
      } else {
        const ratings = book.ratings || [];
        const userId = req.auth.userId;
        const newRating = parseFloat(bookObject.ratings[0].grade);

        const userRatingIndex = ratings.findIndex(
          (rating) => rating.userId === userId
        );

        if (userRatingIndex !== -1) {
          ratings[userRatingIndex].grade = newRating;
        } else {
          ratings.push({ userId, grade: newRating });
        }

        const totalRating = ratings.reduce(
          (sum, rating) => sum + rating.grade,
          0
        );
        const averageRating = totalRating / ratings.length;
        bookModel
          .updateOne(
            { _id: id },
            { ...bookObject, _id: id, ratings, averageRating }
          )
          .then(() =>
            res.status(200).json({ message: "Objet modifié avec succés!" })
          )
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
