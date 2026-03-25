const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// On relie chaque URL à sa fonction
router.get("/", reservationController.getAllReservations); // Lire tout
router.get("/:id", reservationController.getReservationById); // Lire un
router.post("/", reservationController.createReservation); // Créer
router.put("/:id", reservationController.updateReservation); // Modifier
router.delete("/:id", reservationController.deleteReservation); // Supprimer

module.exports = router;
