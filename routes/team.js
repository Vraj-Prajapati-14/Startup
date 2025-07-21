const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// @route   GET /api/team
// @desc    Get all team members (or all if admin)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { department, featured, all } = req.query;
    let query = {};
    
    // If 'all' parameter is not provided, only show available team members
    if (!all) {
      query.isActive = true;
    }

    if (department) {
      query.department = department;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const team = await Team.find(query).sort({ order: 1, joinedDate: -1 });
    res.json(team);
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/team/:id
// @desc    Get team member by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    
    if (!member || !member.isActive) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json(member);
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/team
// @desc    Create new team member (admin only)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const member = new Team(req.body);
    await member.save();
    res.json(member);
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/team/:id
// @desc    Update team member (admin only)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json(member);
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/team/:id
// @desc    Delete team member (admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/team/departments/all
// @desc    Get all departments
// @access  Public
router.get('/departments/all', async (req, res) => {
  try {
    const departments = await Team.distinct('department');
    res.json(departments);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 