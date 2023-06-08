// const bookModel = require("../models/Book.model");

// exports.addBook = (req, res) => {
//   const bookObject = JSON.parse(req.body.book);
//   delete bookObject._id;
//   delete bookObject._userId;
//   const book = new bookModel({
//     ...bookObject,
//     userId: req.auth.userId,
//     imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
//       req.file.filename
//     }`,
//     //initialisation de la moyenne à 0!
//     averageRating:
//       bookObject.ratings.length > 0 ? bookObject.ratings[0].grade : 0,
//   });
//   console.log("Contenu de la requête :", bookObject);
//   book
//     .save()
//     .then(() => {
//       console.log(
//         `Livre ajouté dans la Base de donnée => Titre:${bookObject.title}`
//       );
//       res.status(201).json({ message: "Livre enregistré!", book });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).json({ error });
//     });
// };

// ***************************PURIFY STRING DATA INPUT ***************************************

const bookModel = require("../models/Book.model");
const DOMPurify = require("../config/purifyData"); //Package pour purifier les data dangereuse dans l input

exports.addBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;

  // Purifier les données du formulaire
  const cleanBookObject = {
    // Ajouter les autres champs sans purification
    ...bookObject,
    // Purification des champs STRINGS
    title: DOMPurify.sanitize(bookObject.title),
    author: DOMPurify.sanitize(bookObject.author),
    genre: DOMPurify.sanitize(bookObject.genre),
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
      req.file.filename
    }`,
    averageRating:
      bookObject.ratings.length > 0 ? bookObject.ratings[0].grade : 0,
  };

  const book = new bookModel(cleanBookObject);

  console.log("Contenu de la requête :", cleanBookObject);
  // Vérifier si la purification a modifié les données
  if (
    cleanBookObject.title !== bookObject.title ||
    cleanBookObject.author !== bookObject.author ||
    cleanBookObject.genre !== bookObject.genre
  ) {
    console.log("Détection de données dangereuses !");
    console.log("Utilisateur coupable :", req.auth.userId);
  }
  book
    .save()
    .then(() => {
      console.log(
        `Livre ajouté dans la Base de données => Titre: ${cleanBookObject.title}`
      );
      res.status(201).jsonSerialized({ message: "Livre enregistré!", book });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).jsonSerialized({ error });
    });
};
