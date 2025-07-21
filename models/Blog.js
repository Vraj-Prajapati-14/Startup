const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    image: String,
    bio: String
  },
  category: {
    type: String,
    required: true,
    enum: ['technology', 'development', 'design', 'business', 'startup', 'tutorial', 'news', 'case-study']
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  }],
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.published && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema); 