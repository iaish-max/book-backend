const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadFile");

const Book = require("../models/book");
const Star = require("../models/star");

// get all books
router.get("/getBook", (req, res, next) => {
  Book.find()
    .exec()
    .then((response) => {
      res.status(200).json({
        books: response,
      });
    })
    .catch((err) => {
      // console.log("err is: ", err);
      res.status(500).json({
        err: err,
      });
    });
});

// add Book
router.post(
  "/createBook",
  // uploadCover.single("cover"),
  upload.fields([
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]),
  async (req, res, next) => {
    const { writer, readTime, details } = req.body;

    let star = new Star({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    });

    const x = await star.save();

    let book = new Book({
      title: req.body.title,
      cover: req.files.cover[0].path,
      pdf: req.files.pdf[0].path,
      writer: writer,
      readTime: readTime,
      details: details,
      rating: x._id,
    });

    await book.save();

    res.status(200).json({ book: book });
  }
);

// get a particular book
router.get("/getBookById/:id", async (req, res, next) => {
  console.log("id is: ", req.params.id);

  const x = await Book.find({ _id: req.params.id });

  res.status(200).json({
    book: x,
  });
});

//get all ratings
router.get("/getRating", (req, res, next) => {
  Star.find()
    .exec()
    .then((response) => {
      res.status(200).json({
        ratings: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

// add rating to a book
router.patch("/addRating/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const updatedRating = await Star.findByIdAndUpdate(id, updates, options);

    if (!updatedRating) {
      res.status(500).json({
        message: "Id is wrong!!",
      });
    } else {
      res.status(200).json({
        updatedRating: updatedRating,
      });
    }
  } catch (err) {
    res.status(500).json({
      err: err,
    });
  }
});

module.exports = router;
