const { validationResult } = require('express-validator');
const Skills = require('../models/Skills');

// Add new skill
const addSkill = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, level, category } = req.body;

    // Check if skill already exists for this user
    const existingSkill = await Skills.findOne({ 
      name: name.toLowerCase(), 
      userId: req.user._id 
    });

    if (existingSkill) {
      return res.status(400).json({ message: 'Skill already exists' });
    }

    const skill = new Skills({
      name,
      level,
      category: category || 'Other',
      userId: req.user._id,
    });

    await skill.save();

    res.status(201).json({
      message: 'Skill added successfully',
      skill,
    });
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ message: 'Server error adding skill' });
  }
};

// Get all skills for user
const getSkills = async (req, res) => {
  try {
    const skills = await Skills.find({ userId: req.user._id }).sort({ category: 1, level: -1 });
    
    res.json({
      skills,
      count: skills.length,
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error fetching skills' });
  }
};

// Get public skills (for public viewing)
const getPublicSkills = async (req, res) => {
  try {
    const skills = await Skills.find().sort({ category: 1, level: -1 }).populate('userId', 'username');
    
    res.json({
      skills,
      count: skills.length,
    });
  } catch (error) {
    console.error('Get public skills error:', error);
    res.status(500).json({ message: 'Server error fetching skills' });
  }
};

// Update skill
const updateSkill = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, level, category } = req.body;

    const skill = await Skills.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Update fields
    skill.name = name || skill.name;
    skill.level = level !== undefined ? level : skill.level;
    skill.category = category || skill.category;

    await skill.save();

    res.json({
      message: 'Skill updated successfully',
      skill,
    });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ message: 'Server error updating skill' });
  }
};

// Delete skill
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skills.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await Skills.findByIdAndDelete(req.params.id);

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ message: 'Server error deleting skill' });
  }
};

module.exports = {
  addSkill,
  getSkills,
  getPublicSkills,
  updateSkill,
  deleteSkill,
};