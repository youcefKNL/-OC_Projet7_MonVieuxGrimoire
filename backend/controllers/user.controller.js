const bcrypt = require("bcrypt"); //Package gère cryptage mdp

const jwt = require("jsonwebtoken"); //Package gère les token

const User = require("../models/User.model");

exports.signUp = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          console.log("Utilisateur créé! ID:" + user._id);
          res.status(201).json({ message: "Utilisateur créé! ID:" + user._id });
        })
        .catch((error) => {
          // console.log(error); // Affiche l'erreur dans la console QUESTION???
          res.status(400).json({ error }); //ou .send
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "=> Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "=> Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
              expiresIn: "3h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
