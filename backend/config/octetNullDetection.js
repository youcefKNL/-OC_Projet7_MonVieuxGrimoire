const { bannedIp } = require("./bannedIp");

// Fonction pour détecter les octets nuls dans l'URL
function octetNullDetection(req, res, next) {
  if (req.url.includes("%00")) {
    // Bannir l'adresse IP si octet null détecté
    const ip = req.ip || req.connection.remoteAddress;
    bannedIp(ip);
    console.log("Adresse IP bannie :", ip);
    return res.status(403).send("Accès interdit.");
  }
  next();
}

module.exports = {
  octetNullDetection,
};
