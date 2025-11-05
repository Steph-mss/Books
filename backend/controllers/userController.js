const User = require("../models/User.model");
const Profile = require("../models/Profile.model");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error("❌ Erreur getAllUsers :", err);
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ Erreur createUser :", err);
    res.status(400).json({ message: err.message });
  }
};

exports.getUserFull = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Lien avec MongoDB
    const profile = await Profile.findOne({ userId: req.params.id });

    res.json({ user, profile });
  } catch (err) {
    console.error("❌ Erreur dans getUserFull :", err);
    res.status(500).json({ message: err.message });
  }
};
