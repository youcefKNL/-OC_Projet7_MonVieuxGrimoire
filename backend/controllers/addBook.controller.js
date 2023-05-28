const bookModel = require("../models/Book.model");

exports.addBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new bookModel({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
      req.file.filename
    }`,
    // averageRating: 0,
  });
  book
    .save()
    .then(() => {
      console.log(
        `Livre ajouté dans la Base de donnée => Titre:${bookObject.title}`
      );
      res.status(201).json({ message: "Livre enregistré!" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
