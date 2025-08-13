const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:false},
  name: String,
  email: String,
  rating: Number,
  comment: String,
  predictedEmotion: String,
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Feedback', feedbackSchema);
