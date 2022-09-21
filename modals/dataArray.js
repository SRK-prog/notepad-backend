const mongoose = require("mongoose");
const dataArraySchema = new mongoose.Schema(
  {
    listId: String,
    values: [{ amount: String, label: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DataArray", dataArraySchema);
