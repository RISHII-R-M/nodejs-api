const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    ProductName: String,
    Quantity: Number,
    Date: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", NoteSchema);
