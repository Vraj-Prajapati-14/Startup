const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientPosition: {
    type: String,
    required: true,
    trim: true
  },
  clientCompany: {
    type: String,
    required: true,
    trim: true
  },
  clientImage: {
    type: String
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  service: {
    type: String,
    enum: ['web-development', 'mobile-development', 'ui-ux-design', 'devops', 'consulting', 'other']
  },
  featured: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
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

testimonialSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Testimonial', testimonialSchema); 