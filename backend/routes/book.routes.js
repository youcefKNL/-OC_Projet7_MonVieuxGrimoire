const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.get("/bestrating", bookController.getTop3Books);

module.exports = router;
