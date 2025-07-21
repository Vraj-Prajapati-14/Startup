const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    enum: ['web-development', 'mobile-development', 'ui-ux-design', 'ecommerce', 'saas', 'fintech', 'healthcare', 'education', 'other']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  client: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  teamSize: {
    type: Number
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Project Image'
    }
  }],
  featuredImage: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  challenges: [{
    type: String,
    trim: true
  }],
  solutions: [{
    type: String,
    trim: true
  }],
  results: [{
    type: String,
    trim: true
  }],
  testimonial: {
    clientName: String,
    clientPosition: String,
    clientCompany: String,
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'on-hold'],
    default: 'completed'
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

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema); 