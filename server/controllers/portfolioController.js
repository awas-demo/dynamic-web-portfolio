const { validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');

// Create portfolio item
const createPortfolioItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, imageUrl, liveDemoUrl, repositoryUrl, technologies, featured } = req.body;

    const portfolioItem = new Portfolio({
      title,
      description,
      imageUrl,
      liveDemoUrl,
      repositoryUrl,
      technologies: technologies || [],
      featured: featured || false,
      userId: req.user._id,
    });

    await portfolioItem.save();

    res.status(201).json({
      message: 'Portfolio item created successfully',
      portfolioItem,
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ message: 'Server error creating portfolio item' });
  }
};

// Get all portfolio items for user
const getPortfolioItems = async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    res.json({
      portfolioItems,
      count: portfolioItems.length,
    });
  } catch (error) {
    console.error('Get portfolio items error:', error);
    res.status(500).json({ message: 'Server error fetching portfolio items' });
  }
};

// Get all public portfolio items (for public viewing)
const getPublicPortfolioItems = async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find().sort({ createdAt: -1 }).populate('userId', 'username');
    
    res.json({
      portfolioItems,
      count: portfolioItems.length,
    });
  } catch (error) {
    console.error('Get public portfolio items error:', error);
    res.status(500).json({ message: 'Server error fetching portfolio items' });
  }
};

// Get single portfolio item
const getPortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    res.json({ portfolioItem });
  } catch (error) {
    console.error('Get portfolio item error:', error);
    res.status(500).json({ message: 'Server error fetching portfolio item' });
  }
};

// Update portfolio item
const updatePortfolioItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, imageUrl, liveDemoUrl, repositoryUrl, technologies, featured } = req.body;

    const portfolioItem = await Portfolio.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    // Update fields
    portfolioItem.title = title || portfolioItem.title;
    portfolioItem.description = description || portfolioItem.description;
    portfolioItem.imageUrl = imageUrl || portfolioItem.imageUrl;
    portfolioItem.liveDemoUrl = liveDemoUrl || portfolioItem.liveDemoUrl;
    portfolioItem.repositoryUrl = repositoryUrl || portfolioItem.repositoryUrl;
    portfolioItem.technologies = technologies || portfolioItem.technologies;
    portfolioItem.featured = featured !== undefined ? featured : portfolioItem.featured;

    await portfolioItem.save();

    res.json({
      message: 'Portfolio item updated successfully',
      portfolioItem,
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ message: 'Server error updating portfolio item' });
  }
};

// Delete portfolio item
const deletePortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    await Portfolio.findByIdAndDelete(req.params.id);

    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ message: 'Server error deleting portfolio item' });
  }
};

module.exports = {
  createPortfolioItem,
  getPortfolioItems,
  getPublicPortfolioItems,
  getPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};