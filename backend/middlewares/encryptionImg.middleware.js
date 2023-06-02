// const fs = require("fs");
// const crypto = require("crypto");
// const path = require("path");

// const encryptionImageMiddleware = (req, res, next) => {
//   if (!req.file) {
//     return next();
//   }

//   const imagePath = req.file.path;
//   const encryptionKey = "0123456789abcdef0123456789abcdef";

//   try {
//     const imageBuffer = fs.readFileSync(imagePath);

//     const iv = crypto.randomBytes(16);

//     const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
//     const encryptedImage = Buffer.concat([
//       cipher.update(imageBuffer),
//       cipher.final(),
//     ]);

//     //const encryptedImagePath = `${imagePath}.encrypted`; // Initialise la variable encryptedImagePath
//     const encryptedImagePath = path.join(
//       path.dirname(imagePath),
//       `${path.basename(imagePath, path.extname(imagePath))}.encrypted`
//     );

//     fs.writeFileSync(encryptedImagePath, encryptedImage);

//     fs.unlink(imagePath, (error) => {
//       if (error) {
//         console.log(
//           "Une erreur est survenue lors de la suppression de l'image originale !"
//         );
//         console.error(error);
//       }
//     });

//     req.file.path = encryptedImagePath;

//     next();
//   } catch (error) {
//     console.log("Une erreur est survenue lors du chiffrement de l'image !");
//     console.error(error);
//     res.status(500).json({
//       error: "Une erreur est survenue lors du chiffrement de l'image !",
//     });
//   }
// };

// module.exports = encryptionImageMiddleware;

const fs = require("fs");
const crypto = require("crypto");

const encryptionImageMiddleware = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const imagePath = req.file.path;
  const encryptionKey = "0123456789abcdef0123456789abcdef";

  try {
    const imageBuffer = fs.readFileSync(imagePath);

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
    const encryptedImage = Buffer.concat([
      cipher.update(imageBuffer),
      cipher.final(),
    ]);

    const encryptedImagePath = imagePath;

    fs.writeFileSync(encryptedImagePath, encryptedImage);

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
