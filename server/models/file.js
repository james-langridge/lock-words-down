const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true
    },
    syllable: {
      type: String,
      required: true,
      trim: true
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
