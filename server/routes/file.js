const path = require('path');
const express = require('express');
const multer = require('multer'); // https://www.npmjs.com/package/multer
const File = require('../models/file');
const Router = express.Router();

const upload = multer({
  // https://www.npmjs.com/package/multer#diskstorage
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  // https://www.npmjs.com/package/multer#filefilter
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, or png format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

// @route POST file/upload
// @desc Upload file
// @access Public
Router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { word, syllable } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        word,
        syllable,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(500).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

// @route POST file/update
// @desc Update file
// @access Public
Router.post(
  '/update/:id',
  upload.single('file'),
  async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      const { word, syllable } = req.body;
      if (req.file) {
        const { path, mimetype } = req.file;
        file.file_path = path;
        file.file_mimetype = mimetype;
      }
      file.word = word;
      file.syllable = syllable;
      await file.save();
      res.send('file updated successfully.');
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

// @route GET file/getFile/:id
// @desc Get one file
// @access Public
Router.get('/getFile/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.send(file);
  } catch (error) {
    res.status(500).send('Error while getting file. Try again later.');
  }
});

// @route GET file/getAllFiles
// @desc Get all files
// @access Public
Router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(500).send('Error while getting list of files. Try again later.');
  }
});

// @route GET file/download/:id
// @desc Download single file
// @access Public
Router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(500).send('Error while downloading file. Try again later.');
  }
});

// @route DELETE file/delete/:id
// @desc Delete single file
// @access Public
Router.delete('/delete/:id', async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.send('file deleted successfully.');
  } catch (error) {
    res.status(400).send('Error while deleting file. Try again later.');
  }
});

module.exports = Router;
