const libxmljs = require("libxmljs");

// Middleware pour analyser les données XML
const xmlMiddleware = (req, res, next) => {
  if (req.is("text/xml")) {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        req.body = libxmljs.parseXml(data);
        next();
      } catch (error) {
        res.status(400).send("Invalid XML data");
      }
    });
  } else {
    next();
  }
};

module.exports = xmlMiddleware;
