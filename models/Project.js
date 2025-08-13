const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  url: String,
  github: String,
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
