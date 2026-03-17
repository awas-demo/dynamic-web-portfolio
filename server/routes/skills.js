const express = require('express');
const { body } = require('express-validator');
const {
  addSkill,
  getSkills,
  getPublicSkills,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillsController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const skillValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Skill name must be between 1 and 50 characters'),
  body('level')
    .isInt({ min: 0, max: 100 })
    .withMessage('Skill level must be between 0 and 100'),
  body('category')
    .optional()
    .isIn(['Frontend', 'Backend', 'Database', 'Tools', 'Languages', 'Frameworks', 'Other'])
    .withMessage('Invalid category'),
];

// @route   POST /api/skills
// @desc    Add a new skill
// @access  Private
router.post('/', auth, skillValidation, addSkill);

// @route   GET /api/skills
// @desc    Get all skills for authenticated user
// @access  Private
router.get('/', auth, getSkills);

// @route   GET /api/skills/public
// @desc    Get all public skills
// @access  Public
router.get('/public', getPublicSkills);

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private
router.put('/:id', auth, skillValidation, updateSkill);

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private
router.delete('/:id', auth, deleteSkill);

module.exports = router;