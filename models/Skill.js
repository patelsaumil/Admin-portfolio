const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner','Intermediate','Advanced','Expert'], default: 'Intermediate' },
  percent: { type: Number, min:0, max:100 },
  iconUrl: String
}, { timestamps: true })

module.exports = mongoose.model('Skill', SkillSchema)
