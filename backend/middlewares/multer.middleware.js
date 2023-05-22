const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Configuration de Multer pour gérer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads"); // Répertoire de destination des fichiers
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension); // Génère un nom de fichier unique
  },
});

module.exports = multer({ storage: storage }).single("image");
