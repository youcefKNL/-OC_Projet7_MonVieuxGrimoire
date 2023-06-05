const BannedIp = require("../models/BannedIp.model");

function bannedIp(ip) {
  const bannedIp = new BannedIp({
    ipAddress: ip,
  });

  bannedIp
    .save()
    .then(() => {
      console.log(
        "Adresse IP bannie enregistrée dans la base de données :",
        ip
      );
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'enregistrement de l'adresse IP bannie :",
        error
      );
    });
}

module.exports = {
  bannedIp,
};
