const mongoose = require("mongoose");
const { isEmail } = require("validator"); // Package verifier format data valide
const uniqueValidator = require("mongoose-unique-validator"); //Package verifier format data unique

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, //suprime les Espaces
    lowercase: true, //Pour ne pas tricher avec les maj&min
    validate: [isEmail], //TypeRegex mail
  },
  password: { type: String, required: true, trim: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
