const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Student = mongoose.model("student", StudentSchema);
