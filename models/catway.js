const mongoose = require("mongoose");

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: { type: String },
    type: { type: String },
    catwayState: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

module.exports = mongoose.model("Catway", catwaySchema);
