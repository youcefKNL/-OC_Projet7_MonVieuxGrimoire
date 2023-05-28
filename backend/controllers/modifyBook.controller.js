const bookModel = require("../models/Book.model");

exports.modifyBook = (req, res) => {
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

  bookModel
    .findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        bookModel
          .updateOne(
            { _id: req.params.id },
            { ...bookObject, _id: req.params.id }
          )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
