const Reservation = require("../models/reservation");

// 1. LIRE TOUTES les réservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 2. LIRE UNE SEULE réservation
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation)
      return res.status(404).json({ message: "Réservation introuvable" });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 3. CRÉER une réservation
exports.createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur de création", error: error.message });
  }
};

// 4. MODIFIER une réservation
exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedReservation)
      return res.status(404).json({ message: "Réservation introuvable" });
    res.status(200).json(updatedReservation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur de modification", error: error.message });
  }
};

// 5. SUPPRIMER une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedReservation)
      return res.status(404).json({ message: "Réservation introuvable" });
    res.status(200).json({ message: "Réservation supprimée avec succès !" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur de suppression", error: error.message });
  }
};
