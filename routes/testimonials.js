const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// @route   GET /api/testimonials
// @desc    Get all testimonials (or all if admin)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { service, featured, limit, all } = req.query;
    let query = {};
    
    // If 'all' parameter is not provided, only show published testimonials
    if (!all) {
      query.isActive = true;
    }

    if (service) {
      query.service = service;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    let testimonialsQuery = Testimonial.find(query).sort({ order: 1, createdAt: -1 });

    if (limit) {
      testimonialsQuery = testimonialsQuery.limit(parseInt(limit));
    }

    const testimonials = await testimonialsQuery;
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/testimonials/:id
// @desc    Get testimonial by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial || !testimonial.isActive) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/testimonials
// @desc    Create new testimonial (admin only)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.json(testimonial);
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial (admin only)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial (admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 