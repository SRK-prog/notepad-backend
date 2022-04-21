const mongoose = require("mongoose");
const ListSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    star: {
      type: Boolean,
      default: false,
    },
    updated: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
