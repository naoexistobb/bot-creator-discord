const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  response: { type: String },
  embed: {
      title: { type: String },
      description: { type: String },
      footer: { type: String },
      color: { type: String },
      mention: { type: String },
      thumbnail: { type: String },
      image: { type: String },
  },
});

module.exports = mongoose.model('Commands', CommandSchema);