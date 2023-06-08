//Package qui gère Les journaux / LOG
const { createLogger, format, transports } = require("winston");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");


const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.printf(({ timestamp, level, message, meta }) => {
      const { method, url, ip, userId, body } = meta;
      const sanitizedBody = { ...body, password: undefined }; // Supprimer le champ "password" du corps de la requête
      return `[${timestamp}] [${level}] [${method}] [${url}] [IP: ${ip}] [UserID: ${userId}] ${message} ${JSON.stringify(
        sanitizedBody
      )}`;
    })
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(__dirname, `./logFiles/logs-%DATE%.log`),
      datePattern: "DD-MMMM-YYYY", // Format de la date dans le nom du fichier
    }),
  ],
});

// **********************************************************************************

const logError = (err, req, res, next) => {
  const logErrorData = {
    timestamp: new Date().toISOString(),
    level: "error",
    message: "LOG_Erreur: " + err.stack,
    meta: {
      ip: req.ip,
    },
  };

  if (req.auth && req.auth.userId) {
    logErrorData.meta.userId = req.auth.userId;
  }

  logger.log(logErrorData);

  res.status(500).json({ error: "Erreur interne du serveur" });
};

// **********************************************************************************

const logData = (req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    level: "info",
    message: "LOG_INFO: ",
    meta: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      body: req.body,
    },
  };

  if (req.body.userId) {
    logData.meta.userId = req.body.userId;
  }

  logger.log(logData);

  next();
};

module.exports = { logger, logError, logData };
