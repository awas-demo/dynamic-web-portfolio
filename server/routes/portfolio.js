const express = require('express');
const { body } = require('express-validator');
const {
  createPortfolioItem,
  getPortfolioItems,
  getPublicPortfolioItems,
  getPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const portfolioValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('imageUrl')
    .trim()
    .isURL()
    .withMessage('Please provide a valid image URL'),
  body('liveDemoUrl')
    .trim()
    .isURL()
    .withMessage('Please provide a valid live demo URL'),
  body('repositoryUrl')
    .trim()
    .isURL()
    .withMessage('Please provide a valid repository URL'),
];

// @route   POST /api/portfolio
// @desc    Create a new portfolio item
// @access  Private
router.post('/', auth, portfolioValidation, createPortfolioItem);

// @route   GET /api/portfolio
// @desc    Get all portfolio items for authenticated user
// @access  Private
router.get('/', auth, getPortfolioItems);

// @route   GET /api/portfolio/public
// @desc    Get all public portfolio items
// @access  Public
router.get('/public', getPublicPortfolioItems);

// @route   GET /api/portfolio/:id
// @desc    Get single portfolio item
// @access  Private
router.get('/:id', auth, getPortfolioItem);

// @route   PUT /api/portfolio/:id
// @desc    Update portfolio item
// @access  Private
router.put('/:id', auth, portfolioValidation, updatePortfolioItem);

// @route   DELETE /api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private
router.delete('/:id', auth, deletePortfolioItem);

module.exports = router;