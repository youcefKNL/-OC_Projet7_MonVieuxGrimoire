const express = require("express");
const router = express.Router();

// *************************CONTROLLERS************************************

//const bookController = require("../controllers/book.controller");
const { addBook } = require("../controllers/addBook.controller");
const { deleteBook } = require("../controllers/deleteBook.controller");
const { getAllBooks } = require("../controllers/getAllBooks.controller");
const { getBookById } = require("../controllers/getBookById.controller");
const { getTopBooks } = require("../controllers/getTopBooks.controller");
const { modifyBook } = require("../controllers/modifyBook.controller");

const { rateBook } = require("../controllers/rateBook.controller");

// *************************MIDDLEWARE************************************

const multer = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const resizeImg = require("../middlewares/resizeImg.middleware");

// *************************TEST CRYPTO***********************************
// const encryptionImg = require("../middlewares/encryptionImg.middleware");
// const decryptionImg = require("../middlewares/decryptionImg.middleware");

// ***************************ROUTES**************************************

router.get("/", getAllBooks);
router.post("/", authMiddleware, multer, resizeImg, addBook);
router.get("/bestrating", getTopBooks);
router.get("/:id", getBookById);
router.put("/:id", authMiddleware, multer, resizeImg, modifyBook);
router.delete("/:id", authMiddleware, deleteBook);

router.post("/:id/rating", authMiddleware, rateBook);

// ************************************************************************

module.exports = router;
