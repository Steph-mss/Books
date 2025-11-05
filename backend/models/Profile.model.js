const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    default: ''
  },
  readingHistory: [
    {
      bookId: Number,
      readDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Profile', ProfileSchema);
