const { execSync } = require("child_process");
const fs = require("fs");

const decryptionImageMiddleware = (req, res, next) => {
  const imagePath = req.file.path;
  const encryptionKey =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const iv = "0123456789abcdef0123456789abcdef";

  try {
    const command = `openssl enc -d -aes-256-cbc -in ${imagePath} -K ${encryptionKey} -iv ${iv}`;
    const decryptedImage = execSync(command);

    // Définir les en-têtes de la réponse pour afficher l'image
    res.setHeader("Content-Type", "image/jpeg");
    res.send(decryptedImage);
  } catch (error) {
    console.log("Une erreur est survenue lors du déchiffrement de l'image !");
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors du déchiffrement de l'image !",
    });
  }
};

module.exports = decryptionImageMiddleware;
