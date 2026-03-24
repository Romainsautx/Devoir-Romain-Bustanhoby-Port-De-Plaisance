const mongoose = require("mongoose");

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: String,
      required: [true, "Le numéro du catway est requis"],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Le type de catway est requis"],
      enum: ["long", "short"],
    },
    catwayState: {
      type: String,
      required: [true, "L’état du catway est requis"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Catway", catwaySchema);
