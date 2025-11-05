const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  preferences: {
    type: [String],
    default: [],
  },
  history: [
    {
      book: { type: String, required: true },
      rating: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Profile", ProfileSchema);
