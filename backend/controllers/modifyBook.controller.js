// const bookModel = require("../models/Book.model");

// exports.modifyBook = (req, res) => {
//   const bookObject = req.file
//     ? {
//         ...JSON.parse(req.body.book),
//         userId: req.auth.userId,
//         imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };

//   delete bookObject._userId;

//   bookModel
//     .findOne({ _id: req.params.id })
//     .then((book) => {
//       if (book.userId !== req.auth.userId) {
//         res.status(401).json({ message: "Non autorisé" });
//       } else {
//         bookModel
//           .updateOne(
//             { _id: req.params.id },
//             { ...bookObject, _id: req.params.id }
//           )
//           .then(() => res.status(200).json({ message: "Objet modifié !" }))
//           .catch((error) => res.status(401).json({ error }));
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).json({ error });
//     });
// };

const bookModel = require("../models/Book.model");

exports.modifyBook = async (req, res) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete bookObject._userId;

  try {
    const book = await bookModel.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: "Le livre n'a pas été trouvé." });
    }

    if (book.userId !== req.auth.userId) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    // Mise à jour de la note si elle est fournie
    if (bookObject.rating !== undefined) {
      const userRating = book.ratings.find(
        (rating) => rating.userId === req.auth.userId
      );

      if (!userRating) {
        return res
          .status(400)
          .json({ message: "L'utilisateur n'a pas encore noté ce livre." });
      }

      if (bookObject.rating < 0 || bookObject.rating > 5) {
        return res
          .status(400)
          .json({ message: "La note doit être comprise entre 0 et 5." });
      }

      userRating.grade = bookObject.rating;

      const totalRatings = book.ratings.length;
      const sumRatings = book.ratings.reduce(
        (sum, rating) => sum + rating.grade,
        0
      );
      book.averageRating = sumRatings / totalRatings;
    }

    // Mise à jour des autres propriétés du livre
    Object.assign(book, bookObject);

    await book.save();

    res.status(200).json({ message: "Objet modifié !" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Une erreur est survenue lors de la modification du livre.",
      });
  }
};
