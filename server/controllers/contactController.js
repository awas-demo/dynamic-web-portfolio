const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/email');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message, socialLinks } = req.body;

    const contact = new Contact({
      name,
      email,
      message,
      socialLinks: socialLinks || [],
    });

    await contact.save();

    // Send email notification
    const emailSent = await sendContactEmail({
      name,
      email,
      message,
      socialLinks: socialLinks || [],
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        socialLinks: contact.socialLinks,
        createdAt: contact.createdAt,
      },
      emailSent,
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ message: 'Server error submitting contact form' });
  }
};

// Get all contacts (for admin)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.json({
      contacts,
      count: contacts.length,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error fetching contacts' });
  }
};

// Mark contact as read
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.read = true;
    await contact.save();

    res.json({
      message: 'Contact marked as read',
      contact,
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error marking contact as read' });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error deleting contact' });
  }
};

module.exports = {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
};