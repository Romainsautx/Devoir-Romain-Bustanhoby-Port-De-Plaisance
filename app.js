const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware pour autoriser Express à lire les données envoyées en JSON (correction ici avec "use")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté avec succès à MongoDB !"))
  .catch((error) => console.error("❌ Erreur de connexion à MongoDB :", error));

// Une petite route de test pour voir si le serveur répond
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Bienvenue sur l'API du Port de Plaisance de Russell !" });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});

// IMPORTATION DES ROUTES
const catwayRoutes = require("./routes/catwayRoutes");

app.use("/catways", catwayRoutes);
