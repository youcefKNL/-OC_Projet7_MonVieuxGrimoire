// *************************************- BCRYPT -***********************************

// const bcrypt = require("bcrypt"); //Package gère cryptage mdp

// const jwt = require("jsonwebtoken"); //Package gère les token

// const User = require("../models/User.model");

// const validatePassword = require("../config/passwordUserSchema");

// // *****************************************************************************************

// exports.signUp = (req, res) => {
//   //Verifie si Mdp Fort (selon indication)
//   const validationResult = validatePassword(req.body.password);

//   if (validationResult.length > 0) {
//     const errorMessage =
//       "Le mot de passe ne respecte pas les critères de sécurité : " +
//       validationResult.join(", ");
//     return res.status(400).json({ error: errorMessage });
//   }
//   //Si ok il hach et sel en 2 argument pour stocker in dataBase
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       const user = new User({
//         email: req.body.email,
//         password: hash,
//       });
//       user
//         .save()
//         .then(() => {
//           console.log("Utilisateur créé! ID:" + user._id);
//           res.status(201).json({ message: "Utilisateur créé! ID:" + user._id });
//         })
//         .catch((error) => {
//           console.log("Utilisateur non crée! ID:" + user._id + error);
//           res.status(400).json({ error }); //ou .send
//         });
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// // *****************************************************************************************

// exports.logIn = (req, res) => {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         return res
//           .status(401)
//           .json({ message: "=> Paire login/mot de passe incorrecte" });
//       }
//       bcrypt
//         .compare(req.body.password, user.password)
//         .then((valid) => {
//           if (!valid) {
//             return res
//               .status(401)
//               .json({ message: "=> Paire login/mot de passe incorrecte" });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
//               expiresIn: "3h",
//             }),
//           });
//         })
//         .catch((error) => res.status(500).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// *************************************- ARGON 2 -***********************************
//Recommandé par OWASP HASH & SEL

const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const validatePassword = require("../config/passwordUserSchema");

exports.signUp = (req, res) => {
  //Verifie si Mdp Fort (selon indication)
  const validationResult = validatePassword(req.body.password);

  if (validationResult.length > 0) {
    const errorMessage =
      "Le mot de passe ne respecte pas les critères de sécurité : " +
      validationResult.join(", ");
    return res.status(400).jsonSerialized({ error: errorMessage });
  }
  //Si ok il hach et sel en MM temps pour stocker in dataBase
  argon2
    .hash(req.body.password)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          console.log("Utilisateur créé! ID:" + user._id);
          res
            .status(201)
            .jsonSerialized({ message: "Utilisateur créé! ID:" + user._id });
        })
        .catch((error) => {
          console.log("Utilisateur non créé! ID:" + user._id + error);
          res.status(400).jsonSerialized({ error });
        });
    })
    .catch((error) => res.status(500).jsonSerialized({ error }));
};

// exports.logIn = (req, res) => {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         return res
//           .status(401)
//           .json({ message: "Paire login/mot de passe incorrecte" });
//       }
//       argon2
//         .verify(user.password, req.body.password)
//         .then((valid) => {
//           if (!valid) {
//             return res
//               .status(401)
//               .json({ message: "Paire login/mot de passe incorrecte" });
//           }

//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
//               expiresIn: "3h",
//             }),
//           });
//         })
//         .catch((error) => res.status(500).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

//******************************Avec cookies************************

exports.logIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .jsonSerialized({ message: "Paire login/mot de passe incorrecte" });
      }
      argon2
        .verify(user.password, req.body.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).jsonSerialized({
              message: "Paire login/mot de passe incorrecte",
            });
          }

          const token = jwt.sign({ userId: user._id }, process.env.TOKEN, {
            expiresIn: "3h",
          });

          res.cookie("jwt", token, {
            maxAge: 3 * 60 * 60 * 1000, // Durée de validité du cookie en millisecondes (3h)
            httpOnly: true, // Le cookie ne peut être accédé que par le serveur
            secure: false, // Permet d'envoyer le cookie sur des connexions non sécurisées (HTTP)
            sameSite: "strict", // Le cookie ne sera envoyé que pour des requêtes provenant du même site
          });
          res.status(200).jsonSerialized({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => res.status(503).jsonSerialized({ error }));
    })
    .catch((error) => res.status(500).jsonSerialized({ error }));
};
