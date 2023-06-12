const mongoose = require("mongoose");
const validator = require("validator");

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true }, //identifiant MongoDB unique de l'utilisateur qui a créé le livre
  title: { type: String, required: false, maxlength: 50 }, //titre du livre
  author: { type: String, required: false, maxlength: 50 }, //auteur du livre
  imageUrl: {
    type: String,
    required: true,
    default: "./uploads/node-express-mongo.jpg",
  }, //illustration/couverture du livre
  year: {
    type: Number,
    required: false,
    validate: {
      validator: function (value) {
        return (
          validator.isNumeric(value.toString()) && value.toString().length <= 4
        );
      },
      message:
        "La valeur de 'year' doit être un nombre et ne pas dépasser 4 chiffres.",
    },
  }, //année de publication du livre
  genre: { type: String, required: false }, //genre du livre
  //notes données à un livre
  ratings: [
    {
      userId: { type: String, required: false }, //identifiant MongoDB unique de l'utilisateur qui a noté le livre
      grade: { type: Number, required: false, min: 1, max: 5 }, //note donnée à un livre
    },
  ],
  averageRating: { type: Number, min: 0, max: 5 }, //note moyenne du livre
});

module.exports = mongoose.model("Book", bookSchema);
