const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: String,
      required: [true, "Le numéro du catway est requis"],
      trim: true,
    },
    clientName: {
      type: String,
      required: [true, "Le nom du client est requis"],
      trim: true,
    },
    boatName: {
      type: String,
      required: [true, "Le nom du bateau est requis"],
      trim: true,
    },
    checkIn: {
      type: Date,
      required: [true, "La date d’arrivée (checkIn) est requise"],
    },
    checkOut: {
      type: Date,
      required: [true, "La date de départ (checkOut) est requise"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Reservation", reservationSchema);
