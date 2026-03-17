const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: [0, 'Skill level must be between 0 and 100'],
    max: [100, 'Skill level must be between 0 and 100']
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Languages', 'Frameworks', 'Other'],
    default: 'Other'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Skills', SkillsSchema);