const Jimp = require("jimp");

const resizeImageMiddleware = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  Jimp.read(req.file.path)
    .then((image) => {
      return image
        .resize(500, 700)
        .quality(80)
        .cover(500, 700)
        .write(req.file.path, () => {
          console.log("Image redimensionnée avec succès.");
          next();
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "Une erreur est survenue lors du traitement de l'image.",
      });
    });
};

module.exports = resizeImageMiddleware;
