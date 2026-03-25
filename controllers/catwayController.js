const Catway = require("../models/catway");

// 1. Fonction pour AFFICHER tous les catways (Read)
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();

    // On renvoie le résultat avec un statut 200 (qui veut dire "OK/Succès")
    res.status(200).json(catways);
  } catch (error) {
    // S'il y a un problème, on renvoie une erreur 500 (Erreur serveur)
    res.status(500).json({
      message: "Erreur lors de la récupération des catways",
      error: error.message,
    });
  }
};

// 2. Fonction pour AFFICHER un catway par son ID (Read)
exports.getCatwayById = async (req, res) => {
  try {
    // On récupère l'ID envoyé dans l'URL
    const id = req.params.id;

    // On demande à MongoDB de trouver le catway avec cet ID
    const catway = await Catway.findById(id);

    // Si le catway n'existe pas, on renvoie une erreur 404 (Introuvable)
    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du catway",
      error: error.message,
    });
  }
};

// 3. Fonction pour CRÉER un nouveau catway (Create)
exports.createCatway = async (req, res) => {
  try {
    // On récupère les informations envoyées par l'utilisateur (req.body)
    // et on crée un nouveau "moule" Catway avec
    const newCatway = new Catway({
      catwayNumber: req.body.catwayNumber,
      type: req.body.type,
      catwayState: req.body.catwayState,
    });

    // On sauvegarde ce nouveau catway dans la base de données MongoDB
    const savedCatway = await newCatway.save();

    // On renvoie un statut 201 (qui signifie "Créé avec succès") et le catway
    res.status(201).json(savedCatway);
  } catch (error) {
    // S'il y a une erreur, on renvoie une erreur 400
    res.status(400).json({
      message: "Erreur lors de la création du catway",
      error: error.message,
    });
  }
};

// 4. Fonction pour MODIFIER un catway (Update)
exports.updateCatway = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // On cherche le catway par son ID et on le met à jour.

    const updatedCatway = await Catway.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCatway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.status(200).json(updatedCatway);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la modification du catway",
      error: error.message,
    });
  }
};

// 5. Fonction pour SUPPRIMER un catway (Delete)
exports.deleteCatway = async (req, res) => {
  try {
    const id = req.params.id; // L'ID du catway à supprimer

    // On demande à MongoDB de trouver ce catway et de le détruire
    const deletedCatway = await Catway.findByIdAndDelete(id);

    if (!deletedCatway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    // On renvoie un petit message de confirmation
    res.status(200).json({ message: "Catway supprimé avec succès !" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression du catway",
        error: error.message,
      });
  }
};
