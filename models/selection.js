const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileSchema = mongoose.model('File').schema;

const SelectionSchema = new Schema({
    selectionTitle: {
      type: String,
      required: true
    },
    gameTitle: {
      type: String
    },
    selection: [FileSchema],
    created_by: {
      type: String,
      required: true
    }
  });

module.exports = Selection = mongoose.model('Selection', SelectionSchema);;
