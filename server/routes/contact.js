const express = require('express');
const { body } = require('express-validator');
const {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be between 1 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
];

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactValidation, submitContact);

// @route   GET /api/contact
// @desc    Get all contacts (admin only)
// @access  Private
router.get('/', auth, getContacts);

// @route   PUT /api/contact/:id/read
// @desc    Mark contact as read
// @access  Private
router.put('/:id/read', auth, markAsRead);

// @route   DELETE /api/contact/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, deleteContact);

module.exports = router;