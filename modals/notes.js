const mongoose = require("mongoose");
const Notes = new mongoose.Schema(
  {
    amount: String,
    listId: String,
    label: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", Notes);
