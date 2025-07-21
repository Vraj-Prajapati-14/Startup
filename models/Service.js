const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
  icon: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  features: [{
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
    icon: String
  }],
  technologies: [{
    name: String,
    icon: String,
    description: String
  }],
  process: [{
    step: {
      type: Number,
      required: true
    },
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
    icon: String
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  pricing: {
    basic: {
      price: String,
      features: [String],
      description: String
    },
    standard: {
      price: String,
      features: [String],
      description: String
    },
    premium: {
      price: String,
      features: [String],
      description: String
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['development', 'design', 'consulting', 'support']
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
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

serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Service', serviceSchema); 