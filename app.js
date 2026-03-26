const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// 1. CONFIGURATION DU MOTEUR DE RENDU (EJS)
app.set("view engine", "ejs");
app.set("views", "./views");

// 2. MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// 3. CONNEXION MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté avec succès à MongoDB !"))
  .catch((err) => console.error("Erreur de connexion MongoDB :", err));

// 4. ROUTES DES PAGES (Pour le navigateur / Affichage EJS)

// Page d'accueil (Login + Présentation)
app.get("/", (req, res) => {
  res.render("index");
});

// Tableau de bord (Menu principal)
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Gestion des Catways
app.get("/catways-list", (req, res) => {
  res.render("catways");
});

// Gestion des Réservations
app.get("/reservations-list", (req, res) => {
  res.render("reservations");
});

// Gestion du Personnel (Utilisateurs)
app.get("/users-list", (req, res) => {
  res.render("users");
});

// Documentation de l'API
app.get("/docs", (req, res) => {
  res.render("docs");
});

// 5. ROUTES API
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/catways", catwayRoutes);
app.use("/reservations", reservationRoutes);
app.use("/users", userRoutes);

// 6. DÉMARRAGE DU SERVEUR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur : http://localhost:${PORT}`);
});
