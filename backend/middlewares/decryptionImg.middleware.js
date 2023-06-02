const fs = require("fs");
const crypto = require("crypto");

const decryptionImageMiddleware = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const imagePath = req.file.path;
  const encryptionKey = "0123456789abcdef0123456789abcdef";

  try {
    const encryptedImageBuffer = fs.readFileSync(imagePath);

    const iv = encryptedImageBuffer.subarray(0, 16);
    const encryptedData = encryptedImageBuffer.subarray(16);

    const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
    const decryptedImage = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);

    req.decryptedImage = decryptedImage;

    next();
  } catch (error) {
    console.log("Une erreur est survenue lors du décryptage de l'image !");
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors du décryptage de l'image !",
    });
  }
};

module.exports = decryptionImageMiddleware;
