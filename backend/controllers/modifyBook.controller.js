// / ***************************PURIFY STRING DATA INPUT ***************************************

const bookModel = require("../models/Book.model");
const fs = require("fs");
const DOMPurify = require("../config/purifyData"); //Package pour purifier les data dangereuse dans l input

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

  // Purifier les données du formulaire
  const cleanBookObject = {
    ...bookObject,
    title: DOMPurify.sanitize(bookObject.title),
    author: DOMPurify.sanitize(bookObject.author),
    genre: DOMPurify.sanitize(bookObject.genre),
  };
  // Vérifier si la purification a modifié les données
  if (
    cleanBookObject.title !== bookObject.title ||
    cleanBookObject.author !== bookObject.author ||
    cleanBookObject.genre !== bookObject.genre
  ) {
    console.log("Détection de données dangereuses !");
    console.log("Utilisateur coupable :", req.auth.userId);
    res.status(400).jsonSerialized({
      message: "Données dangereuses détectées ! You are WANTED...",
    });
    return;
  }
  bookModel
    .findById(id)
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(403).jsonSerialized({ message: "Requête non autorisée !" });
      } else {
        //Logique supression ancienne image pour remplacer GreenCode
        // Récupérer l'ancienne URL de l'image
        const previousImageUrl = book.imageUrl;
        // Obtenir le chemin local à partir de l'URL
        const previousImagePath = `uploads/${previousImageUrl
          .split("/")
          .pop()}`; //Extrait le dernier elment de array aprés "/"

        bookModel
          .updateOne({ _id: id }, { ...cleanBookObject, _id: id })
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
            res
              .status(200)
              .jsonSerialized({ message: "Objet modifié avec succès !" });
          })
          .catch((error) => res.status(401).jsonSerialized({ error }));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).jsonSerialized({ error });
    });
};
