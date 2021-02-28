const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileSchema = mongoose.model('File').schema;

const SelectionSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    selection: [FileSchema],
    created_by: {
      type: String,
      required: true
    }
  });

module.exports = Selection = mongoose.model('Selection', SelectionSchema);;
