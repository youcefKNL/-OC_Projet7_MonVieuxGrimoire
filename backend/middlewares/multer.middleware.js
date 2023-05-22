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

//Vérification Filtre le type de ficher upload
const fileFilter = (req, file, callback) => {
  // Vérifie le type de fichier
  if (file.mimetype.startsWith("image/")) {
    callback(null, true); // Accepte le fichier
  } else {
    callback(new Error("Le fichier doit être une image..."), false); // Rejette le fichier
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);
