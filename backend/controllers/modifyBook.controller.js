// const bookModel = require("../models/Book.model");

// exports.modifyBook = (req, res) => {
//   const { id } = req.params;
//   const bookObject = req.file
//     ? {
//         ...JSON.parse(req.body.book),
//         imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };

//   bookModel
//     .findById(id)
//     .then((book) => {
//       if (book.userId !== req.auth.userId) {
//         res.status(403).json({ message: "Requête non autorisée !" });
//       } else {
//         bookModel
//           .updateOne({ _id: id }, { ...bookObject, _id: id })
//           .then(() =>
//             res.status(200).json({ message: "Objet modifié avec succès !" })
//           )
//           .catch((error) => res.status(401).json({ error }));
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({ error });
//     });
// };

const bookModel = require("../models/Book.model");
const fs = require("fs");

exports.modifyBook = (req, res) => {
  const { id } = req.params;
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  bookModel
    .findById(id)
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(403).json({ message: "Requête non autorisée !" });
      } else {
        //Logique supression ancienne image pour remplacer GreenCode
        // Récupérer l'ancienne URL de l'image
        const previousImageUrl = book.imageUrl;
        // Obtenir le chemin local à partir de l'URL
        const previousImagePath = `uploads/${previousImageUrl
          .split("/")
          .pop()}`;

        bookModel
          .updateOne({ _id: id }, { ...bookObject, _id: id })
          .then(() => {
            if (req.file && previousImageUrl) {
              // Supprimer l'ancienne image si une nouvelle image a été téléchargée et qu'il existe une ancienne image
              fs.unlink(previousImagePath, (err) => {
                if (err) {
                  console.error(
                    "Erreur lors de la suppression de l'ancienne image :",
                    err
                  );
                } else {
                  console.log("Ancienne image supprimée avec succès !");
                }
              });
            }
            res.status(200).json({ message: "Objet modifié avec succès !" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
