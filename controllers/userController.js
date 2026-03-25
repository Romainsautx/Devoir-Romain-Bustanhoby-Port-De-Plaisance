const User = require("../models/user");
const bcrypt = require("bcrypt");

// 1. LIRE TOUS les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 2. LIRE UN SEUL utilisateur
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 3. CRÉER un utilisateur (Avec cryptage du mot de passe !)
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    
    savedUser.password = undefined;
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Erreur de création", error: error.message });
  }
};

    const savedUser = await newUser.save();

    savedUser.password = undefined;
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur de création", error: error.message });
  }
};

// 4. MODIFIER un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    ).select("-password");
    if (!updatedUser)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur de modification", error: error.message });
  }
};

// 5. SUPPRIMER un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    res.status(200).json({ message: "Utilisateur supprimé avec succès !" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur de suppression", error: error.message });
  }
};
