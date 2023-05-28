const bookModel = require("../models/Book.model");
const fs = require("fs");

exports.deleteBook = (req, res, next) => {
  bookModel
    .findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        const filename = book.imageUrl.split("/book_picture/")[1];
        console.log(filename);
        fs.unlink(`uploads/${filename}`, (err) => {
          if (err) {
            console.log("Erreur lors de la suppression de l'image1 :", err);
            res
              .status(500)
              .json({ error: "Erreur lors de la suppression de l'image2" });
          } else {
            bookModel
              .deleteOne({ _id: req.params.id })
              .then(() => {
                console.log("Livre supprimé avec succès !");
                res.status(200).json({ message: "Objet supprimé !" });
              })
              .catch((error) => {
                console.log("Erreur lors de la suppression du livre3 :", error);
                res.status(401).json({ error });
              });
          }
        });
      }
    })
    .catch((error) => {
      console.log("Erreur lors de la recherche du livre :", error);
      res.status(500).json({ "Erreur lors de la recherche du livre": error });
    });
};
