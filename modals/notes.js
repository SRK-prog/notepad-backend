const mongoose = require("mongoose");
const Notes = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    listId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", Notes);
