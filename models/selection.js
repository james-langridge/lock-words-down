const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TermEntrySchema = mongoose.model('term_entries').schema;

const SelectionSchema = new Schema({
  selectionTitle: {
    type: String,
    required: true
  },
  gameTitle: {
    type: String
  },
  selection: [TermEntrySchema],
  created_by: {
    type: String,
    required: true
  }
});

module.exports = Selection = mongoose.model('selections', SelectionSchema);
