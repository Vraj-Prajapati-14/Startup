const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// @route   GET /api/blog
// @desc    Get all published blog posts (or all if admin)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit, page, all } = req.query;
    let query = {};
    
    // If 'all' parameter is not provided, only show published blogs
    if (!all) {
      query.published = true;
    }

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const posts = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Blog.countDocuments(query);

    res.json({
      posts,
      pagination: {
        current: pageNum,
        total: Math.ceil(total / limitNum),
        hasNext: pageNum * limitNum < total,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get blog post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ 
      slug: req.params.slug, 
      published: true 
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog
// @desc    Create new blog post (admin only)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const post = new Blog(req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post (admin only)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post (admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog/:id/comments
// @desc    Add comment to blog post
// @access  Public
router.post('/:id/comments', async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const post = await Blog.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    post.comments.push({
      name,
      email,
      comment
    });

    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/categories/all
// @desc    Get all blog categories
// @access  Public
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Blog.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 