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
    //initialisation de la moyenne à 0!
    averageRating:
      bookObject.ratings.length > 0 ? bookObject.ratings[0].grade : 0,
  });
  console.log("Contenu de la requête :", bookObject);
  book
    .save()
    .then(() => {
      console.log(
        `Livre ajouté dans la Base de donnée => Titre:${bookObject.title}`
      );
      res.status(201).json({ message: "Livre enregistré!", book });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
