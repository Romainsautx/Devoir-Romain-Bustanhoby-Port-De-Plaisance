const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: { type: String },
    clientName: { type: String },
    boatName: { type: String },
    checkIn: { type: Date },
    checkOut: { type: Date },
  },
  {
    timestamps: true,
    strict: false,
  },
);

module.exports = mongoose.model("Reservation", reservationSchema);
