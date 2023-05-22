const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

const multer = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", bookController.getAllBooks);
router.get("/bestrating", bookController.getTopBooks);
router.get("/:id", bookController.getBookById);

// *******************************************************************
// Configuration de Multer pour gérer les fichiers
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Répertoire de destination des fichiers
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Génère un nom de fichier unique
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // Vérifie le type de fichier
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true); // Accepte le fichier
//   } else {
//     cb(new Error("Le fichier doit être une image."), false); // Rejette le fichier
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route pour ajouter un nouveau livre
router.post("/", authMiddleware, multer, bookController.addBook);

module.exports = router;
