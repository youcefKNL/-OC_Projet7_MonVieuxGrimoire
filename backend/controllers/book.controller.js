const bookModel = require("../models/Book.model");

// Obtenir tous les livres de la base de données
exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des livres" });
  }
};

// Obtenir un livre par ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookModel.findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ error: "Livre non trouvé" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du livre" });
  }
};

// Obtenir les 3 livres avec la meilleure note moyenne
exports.getTopBooks = async (req, res) => {
  try {
    const books = await bookModel.find().sort({ averageRating: -1 }).limit(3);
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des livres" });
    console.log("Erreur:", error);
  }
};

// exports.addBook = async (req, res) => {
//   try {
//     // Récupération des données du livre à partir du corps de la requête
//     const bookData =  new bookModel{
//       userId: req.auth.userId,
//       book: req.body.book,
//           imageUrl: `${req.protocol}://${req.get("host")}/book_picture/${
//   req.file.filename,
//       rating: [],
//       averageRating: 0,
//     };

//     // Création d'une nouvelle instance de bookModel avec les données du livre
//     const book = new bookModel(bookData);
//     delete bookData._id;
//     delete bookData._userId;

//     // Enregistrement du livre dans la base de données
//     await book.save();

//     // Réponse réussie avec un code de statut 201 (Created) et un message de succès
//     res.status(201).json({ message: "Livre ajouté avec succès !" });
//   } catch (error) {
//     // En cas d'erreur, réponse avec un code de statut 500 (Internal Server Error) et un message d'erreur
//     console.log("Erreur lors de l'ajout du livre :", error);
//     res.status(500).json({ error: "Erreur lors de l'ajout du livre" });
//   }
// };

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
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Livre enregistré!" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
