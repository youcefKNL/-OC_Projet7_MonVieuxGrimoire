const express = require("express");
const router = express.Router();

//const bookController = require("../controllers/book.controller");

const { addBook } = require("../controllers/addBook.controller");
const { deleteBook } = require("../controllers/deleteBook.controller");
const { getAllBooks } = require("../controllers/getAllBooks.controller");
const { getBookById } = require("../controllers/getBookById.controller");
const { getTopBooks } = require("../controllers/getTopBooks.controller");
const { modifyBook } = require("../controllers/modifyBook.controller");

const multer = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const resizeImg = require("../middlewares/resizeImg.middleware");

router.get("/", getAllBooks);
router.post("/", authMiddleware, multer, resizeImg, addBook);
router.get("/bestrating", getTopBooks);
router.get("/:id", getBookById);
router.put("/:id", authMiddleware, multer, resizeImg, modifyBook);
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
