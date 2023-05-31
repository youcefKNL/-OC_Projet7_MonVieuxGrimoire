// const Jimp = require("jimp"); //Package qui gére le redimenssionement des img & mimes

// const resizeImageMiddleware = (req, res, next) => {
//   if (!req.file) {
//     return next();
//   }

//   const imagePath = req.file.path;

//   Jimp.read(imagePath)
//     .then((image) => {
//       return image
//         .resize(Jimp.AUTO, 700)
//         .quality(80)
//         .contain(500, 700)
//         .write(req.file.path.replace(/\.[^.]+$/, ".jpg"), () => {
//           console.log("Image redimensionnée avec succès sous format .JPG");
//           next();
//         });
//     })
//     .catch((error) => {
//       console.log("Une erreur est survenue lors du traitement de l'image!");
//       console.error(error);
//       res.status(500).json({
//         error: "Une erreur est survenue lors du traitement de l'image!",
//       });
//     });
// };

// module.exports = resizeImageMiddleware;

const Jimp = require("jimp");

const resizeImageMiddleware = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const imagePath = req.file.path;

  try {
    const image = await Jimp.read(imagePath);
    await image
      .resize(Jimp.AUTO, 700)
      .quality(80) // Ajuster la qualité de l'image JPG (0-100)
      .contain(500, Jimp.AUTO)
      .writeAsync(imagePath); // Écrire l'image redimensionnée en écrasant l'ancienne image

    console.log(
      "Image convertie en format JPG & Redimenssionnée avec succès => GREEN CODE!"
    );
    next();
  } catch (error) {
    console.log("Une erreur est survenue lors du traitement de l'image !");
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors du traitement de l'image !",
    });
  }
};

module.exports = resizeImageMiddleware;
