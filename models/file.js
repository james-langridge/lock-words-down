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
    image_url: {
      type: String,
      required: true
    },
    created_by: {
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
