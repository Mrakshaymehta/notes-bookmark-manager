const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);