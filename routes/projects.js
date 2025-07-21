const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// @route   GET /api/projects
// @desc    Get all projects (or all if admin)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit, all } = req.query;
    let query = {};
    
    // If 'all' parameter is not provided, only show completed projects
    if (!all) {
      query.status = 'completed';
    }

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    let projectsQuery = Project.find(query).sort({ createdAt: -1 });

    if (limit) {
      projectsQuery = projectsQuery.limit(parseInt(limit));
    }

    const projects = await projectsQuery;
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/projects
// @desc    Create new project (admin only)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project (admin only)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project (admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/categories/all
// @desc    Get all project categories
// @access  Public
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Project.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 