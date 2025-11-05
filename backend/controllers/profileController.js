const Profile = require("../models/Profile.model");

// Récupérer le profil d’un utilisateur
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error("❌ Erreur lors du chargement du profil :", err);
    res.status(500).json({ message: err.message });
  }
};

// Créer un profil pour un utilisateur
exports.createProfile = async (req, res) => {
  try {
    const { userId, preferences, history } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId manquant" });
    }

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile déjà existant pour cet utilisateur" });
    }

    const newProfile = new Profile({ userId, preferences, history });
    await newProfile.save();

    res.status(201).json(newProfile);
  } catch (err) {
    console.error("❌ Erreur lors de la création du profil :", err);
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour le profil d’un utilisateur
exports.updateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour du profil :", err);
    res.status(500).json({ message: err.message });
  }
};
