const AWS = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const TermEntry = require("../models/termEntry");
const Router = express.Router();
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error("Only upload files with jpg, jpeg, or png format."));
    }
    cb(undefined, true);
  },
});

// @route POST term
// @desc Save term entry
// @access Public
Router.post(
  "/",
  upload.single("file"),
  async (req, res) => {
    try {
      const { term, syllable, userId } = req.body;
      const termEntry = new TermEntry({
        term,
        syllable,
        created_by: userId,
      });
      if (req.file) {
        const imageUrl = req.file.location;
        termEntry.image_url = imageUrl;
      }
      await termEntry.save();
      res.send("Term entry saved successfully.");
    } catch (error) {
      res.status(500).send("Error while saving term entry. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

// @route POST term/:termId
// @desc Update term entry
// @access Public
Router.post(
  "/:termId",
  upload.single("file"),
  async (req, res) => {
    try {
      const termEntry = await TermEntry.findById(req.params.termId);
      const { term, syllable } = req.body;
      if (req.file) {
        const imageUrl = req.file.location;
        termEntry.image_url = imageUrl;
      }
      termEntry.term = term;
      termEntry.syllable = syllable;
      await termEntry.save();
      res.send("Term entry updated successfully.");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

// @route GET term/:termId
// @desc Get one term entry
// @access Public
Router.get("/:termId", async (req, res) => {
  try {
    const termEntry = await TermEntry.findById(req.params.termId);
    res.send(termEntry);
  } catch (error) {
    res.status(500).send("Error while getting term entry. Try again later.");
  }
});

// @route GET term/all/:userId
// @desc Get all term entries
// @access Public
Router.get("/all/:userId", async (req, res) => {
  try {
    const termEntries = await TermEntry.find({ created_by: req.params.userId });
    const sortedByCreationDate = termEntries.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res
      .status(500)
      .send("Error while getting list of term entries. Try again later.");
  }
});

// @route DELETE term/:termId
// @desc Delete single term entry
// @access Public
Router.delete("/:termId", async (req, res) => {
  try {
    await TermEntry.findByIdAndDelete(req.params.termId);
    res.send("Term entry deleted successfully.");
  } catch (error) {
    res.status(400).send("Error while deleting term entry. Try again later.");
  }
});

module.exports = Router;
