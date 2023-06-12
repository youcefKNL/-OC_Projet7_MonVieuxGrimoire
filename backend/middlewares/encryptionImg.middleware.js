const { execSync } = require("child_process"); //Package Natif node openSSL pour crypto
const fs = require("fs");

const encryptionImageMiddleware = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const imagePath = req.file.path;
  const encryptionKey =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const iv = "0123456789abcdef0123456789abcdef";
  const encryptedImagePath = imagePath;

  try {
    const command = `openssl enc -aes-256-cbc -salt -in ${imagePath} -out ${encryptedImagePath} -K ${encryptionKey} -iv ${iv}`;
    execSync(command);

    // Supprimer le fichier JPG d'origine
    fs.unlinkSync(imagePath);

    // Mettre à jour le chemin du fichier avec le fichier chiffré
    req.file.path = encryptedImagePath;

    next();
  } catch (error) {
    console.log("Une erreur est survenue lors du chiffrement de l'image !");
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors du chiffrement de l'image !",
    });
  }
};

module.exports = encryptionImageMiddleware;
