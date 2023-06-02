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
      // Ajuster la qualité de l'image JPG (0-100)
      .quality(80)
      //Differenece avec cover&contain ne rogne pas sur l img il garde le ratio cover coupe
      .cover(500, 700)
      // Écrire l'image redimensionnée en écrasant l'ancienne image
      .writeAsync(imagePath);

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
