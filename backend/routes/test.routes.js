const express = require("express");
const router = express.Router();
const userModel = require("../models/User.model");
const booksModel = require("../models/Book.model");

//Voir tous les user dans DataBase
router.get("/test", async (req, res) => {
  const users = await userModel.find().select("-password");

  const books = await booksModel.find();
  // Récupérez le jeton CSRF à partir de la demande

  res.status(200);
  res.json({ message: "Test GET du serveur réussi !", users, books });
});

module.exports = router;
