const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true }, //identifiant MongoDB unique de l'utilisateur qui a créé le livre
  title: { type: String, required: false }, //titre du livre
  author: { type: String, required: false }, //auteur du livre
  imageUrl: { type: String, required: true }, //illustration/couverture du livre
  year: { type: Number, required: false }, //année de publication du livre
  genre: { type: String, required: false }, //genre du livre
  //notes données à un livre
  ratings: [
    {
      userId: { type: String, required: true }, //identifiant MongoDB unique de l'utilisateur qui a noté le livre
      grade: { type: Number, required: true }, //note donnée à un livre
    },
  ],
  averageRating: { type: Number }, //note moyenne du livre
});

module.exports = mongoose.model("Book", bookSchema);
