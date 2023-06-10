const express = require("express");
const router = express.Router();

// *************************CONTROLLERS************************************

const userController = require("../controllers/user.controller");

// ***************************ROUTES**************************************

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

// ************************************************************************

module.exports = router;
