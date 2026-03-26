const Catway = require("../models/catway");

/**
 * Récupère la liste complète des catways enregistrés dans la base de données.
 * @async
 * @function getAllCatways
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie un statut 200 et la liste des catways au format JSON.
 * @throws {Error} Renvoie un statut 500 en cas d'erreur du serveur.
 */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des catways",
      error: error.message,
    });
  }
};

// 2. Fonction pour AFFICHER un catway par son ID (Read)
exports.getCatwayById = async (req, res) => {
  try {
    const id = req.params.id;

    const catway = await Catway.findById(id);

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

/**
 * Crée un nouveau catway avec les informations fournies dans le corps de la requête.
 * @async
 * @function createCatway
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} req.body - Le corps de la requête contenant les données du catway.
 * @param {Number} req.body.catwayNumber - Le numéro d'identification du catway.
 * @param {String} req.body.type - Le type de catway (long ou short).
 * @param {String} req.body.catwayState - L'état de conservation du catway.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie un statut 201 si la création a réussi.
 */
exports.createCatway = async (req, res) => {
  try {
    const newCatway = new Catway({
      catwayNumber: req.body.catwayNumber,
      type: req.body.type,
      catwayState: req.body.catwayState,
    });

    const savedCatway = await newCatway.save();

    res.status(201).json(savedCatway);
  } catch (error) {
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
    const id = req.params.id;

    const deletedCatway = await Catway.findByIdAndDelete(id);

    if (!deletedCatway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.status(200).json({ message: "Catway supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du catway",
      error: error.message,
    });
  }
};
