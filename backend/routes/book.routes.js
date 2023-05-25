const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

const multer = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", bookController.getAllBooks);
router.post("/", authMiddleware, multer, bookController.addBook);
router.get("/bestrating", bookController.getTopBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", authMiddleware, multer, bookController.modifyBook);
router.delete("/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
