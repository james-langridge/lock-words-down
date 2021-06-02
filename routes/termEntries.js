const path = require('path');
const AWS = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const TermEntry = require('../models/termEntry');
const Selection = require('../models/selection');
const Router = express.Router();
require("dotenv").config();

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

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
      return cb(
        new Error(
          'Only upload files with jpg, jpeg, or png format.'
        )
      );
    }
    cb(undefined, true);
  }
});

// @route POST term/upload
// @desc Save term entry
// @access Public
Router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { term, syllable, userId } = req.body;
      const termEntry = new TermEntry({
        term,
        syllable,
        created_by: userId
      });
      if (req.file) {
        const imageUrl = req.file.location;
        termEntry.image_url = imageUrl;
      }
      await termEntry.save();
      res.send('Term entry saved successfully.');
    } catch (error) {
      res.status(500).send('Error while saving term entry. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

// @route POST term/update
// @desc Update term entry
// @access Public
Router.post(
  '/update/:id',
  upload.single('file'),
  async (req, res) => {
    try {
      const termEntry = await TermEntry.findById(req.params.id);
      const { term, syllable } = req.body;
      if (req.file) {
        const imageUrl = req.file.location;
        termEntry.image_url = imageUrl;
      }
      termEntry.term = term;
      termEntry.syllable = syllable;
      await termEntry.save();
      res.send('Term entry updated successfully.');
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

// @route GET term/search
// @desc Search for terms
// @access Public
// Router.get('/search/:id', async (req, res) => {
//   try {
//     let result = await TermEntry.aggregate().
//       search({
//        text: {
//          query: `${req.body.searchTerm}`,
//          path: 'term'
//        },
//        "compound": {
//
//         "must": [{
//
//           "text": {
//
//             "query": "varieties",
//
//             "path": "description"
//
//           }
//
//         }],
//      });
//     response.send(result);
//   } catch (e) {
//       response.status(500).send({ message: e.message });
//     }
// });

// @route GET term/getTerm/:id
// @desc Get one term entry
// @access Public
Router.get('/getTerm/:id', async (req, res) => {
  try {
    const termEntry = await TermEntry.findById(req.params.id);
    res.send(termEntry);
  } catch (error) {
    res.status(500).send('Error while getting term entry. Try again later.');
  }
});

// @route GET term/getAllTerms
// @desc Get all term entries
// @access Public
Router.get('/getAllTerms/:id', async (req, res) => {
  try {
    const termEntries = await TermEntry.find({ created_by: req.params.id });
    const sortedByCreationDate = termEntries.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(500).send('Error while getting list of term entries. Try again later.');
  }
});

// @route GET term/download/:id
// @desc Download single file
// @access Public
// Router.get('/download/:id', async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     res.set({
//       'Content-Type': file.file_mimetype
//     });
//     res.sendFile(path.join(__dirname, '..', file.file_path));
//   } catch (error) {
//     res.status(500).send('Error while downloading file. Try again later.');
//   }
// });

// @route DELETE term/delete/:id
// @desc Delete single term entry
// @access Public
Router.delete('/delete/:id', async (req, res) => {
  try {
    await TermEntry.findByIdAndDelete(req.params.id);
    res.send('Term entry deleted successfully.');
  } catch (error) {
    res.status(400).send('Error while deleting term entry. Try again later.');
  }
});

module.exports = Router;
