const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermEntrySchema = new Schema({
  term: {
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
    type: String
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

module.exports = TermEntry = mongoose.model('term_entries', TermEntrySchema);
