const mongoose = require("mongoose");
require("dotenv").config();

// On importe nos modèles
const Catway = require("./models/catway");
const Reservation = require("./models/reservation");

const catwaysData = require("./catways.json");
const reservationsData = require("./reservations.json");

const importData = async () => {
  try {
    // 1. Connexion à la base de données
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB pour l'importation...");

    // 2. Nettoyage de la base
    await Catway.deleteMany({});
    await Reservation.deleteMany({});
    console.log("🧹 Base de données nettoyée.");

    // 3. Insertion des données
    await Catway.insertMany(catwaysData);
    await Reservation.insertMany(reservationsData);
    console.log("🎉 Données importées avec succès !");

    process.exit();
  } catch (error) {
    console.error("❌ Erreur lors de l'importation :", error);
    process.exit(1);
  }
};

importData();
