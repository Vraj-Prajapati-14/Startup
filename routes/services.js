const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// @route   POST /api/services/add-static
// @desc    Add current static services to database
// @access  Private
router.post('/add-static', async (req, res) => {
  try {
    const staticServices = [
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom web applications built with modern technologies and best practices.',
        shortDescription: 'Custom web applications built with modern technologies and best practices.',
        icon: '/icons/web-development.svg',
        image: '/images/web-development.jpg',
        category: 'development',
        featured: true,
        isActive: true,
        order: 1,
        features: [
          { title: 'React & Node.js', description: 'Modern JavaScript frameworks', icon: 'code' },
          { title: 'Responsive Design', description: 'Mobile-first approach', icon: 'smartphone' },
          { title: 'SEO Optimized', description: 'Search engine friendly', icon: 'search' },
          { title: 'Performance Focused', description: 'Fast loading times', icon: 'zap' }
        ],
        benefits: [
          'Scalable architecture',
          'Cross-browser compatibility',
          'Security best practices',
          '24/7 support'
        ]
      },
      {
        title: 'Mobile Development',
        slug: 'mobile-development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        shortDescription: 'Native and cross-platform mobile applications for iOS and Android.',
        icon: '/icons/mobile-development.svg',
        image: '/images/mobile-development.jpg',
        category: 'development',
        featured: true,
        isActive: true,
        order: 2,
        features: [
          { title: 'React Native', description: 'Cross-platform development', icon: 'smartphone' },
          { title: 'Flutter', description: 'Google\'s UI toolkit', icon: 'layers' },
          { title: 'Native iOS/Android', description: 'Platform-specific apps', icon: 'code' },
          { title: 'App Store Ready', description: 'Publishing support', icon: 'download' }
        ],
        benefits: [
          'Cross-platform compatibility',
          'Native performance',
          'App store optimization',
          'Push notifications'
        ]
      },
      {
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'Beautiful, intuitive user interfaces that enhance user experience.',
        shortDescription: 'Beautiful, intuitive user interfaces that enhance user experience.',
        icon: '/icons/ui-ux-design.svg',
        image: '/images/ui-ux-design.jpg',
        category: 'design',
        featured: true,
        isActive: true,
        order: 3,
        features: [
          { title: 'User Research', description: 'Understanding user needs', icon: 'users' },
          { title: 'Wireframing', description: 'Low-fidelity prototypes', icon: 'grid' },
          { title: 'Prototyping', description: 'Interactive mockups', icon: 'play' },
          { title: 'Design Systems', description: 'Consistent design language', icon: 'palette' }
        ],
        benefits: [
          'User-centered design',
          'Improved usability',
          'Brand consistency',
          'Faster development'
        ]
      },
      {
        title: 'DevOps',
        slug: 'devops',
        description: 'Streamline your development and deployment processes with modern DevOps.',
        shortDescription: 'Streamline your development and deployment processes with modern DevOps.',
        icon: '/icons/devops.svg',
        image: '/images/devops.jpg',
        category: 'support',
        featured: false,
        isActive: true,
        order: 4,
        features: [
          { title: 'CI/CD Pipelines', description: 'Automated deployment', icon: 'git-branch' },
          { title: 'Cloud Infrastructure', description: 'Scalable cloud solutions', icon: 'cloud' },
          { title: 'Monitoring', description: 'Real-time system monitoring', icon: 'activity' },
          { title: 'Security', description: 'Security best practices', icon: 'shield' }
        ],
        benefits: [
          'Faster deployments',
          'Reduced downtime',
          'Better security',
          'Cost optimization'
        ]
      },
      {
        title: 'Consulting',
        slug: 'consulting',
        description: 'Expert guidance to help you make the right technology decisions.',
        shortDescription: 'Expert guidance to help you make the right technology decisions.',
        icon: '/icons/consulting.svg',
        image: '/images/consulting.jpg',
        category: 'consulting',
        featured: false,
        isActive: true,
        order: 5,
        features: [
          { title: 'Technical Strategy', description: 'Technology roadmap planning', icon: 'target' },
          { title: 'Architecture Review', description: 'System architecture analysis', icon: 'layers' },
          { title: 'Team Training', description: 'Skill development programs', icon: 'users' },
          { title: 'Best Practices', description: 'Industry standards implementation', icon: 'check-circle' }
        ],
        benefits: [
          'Expert guidance',
          'Cost savings',
          'Risk mitigation',
          'Knowledge transfer'
        ]
      },
      {
        title: 'Digital Transformation',
        slug: 'digital-transformation',
        description: 'Transform your business with cutting-edge digital solutions.',
        shortDescription: 'Transform your business with cutting-edge digital solutions.',
        icon: '/icons/digital-transformation.svg',
        image: '/images/digital-transformation.jpg',
        category: 'consulting',
        featured: false,
        isActive: true,
        order: 6,
        features: [
          { title: 'Process Automation', description: 'Workflow optimization', icon: 'settings' },
          { title: 'Data Analytics', description: 'Business intelligence solutions', icon: 'bar-chart' },
          { title: 'Cloud Migration', description: 'Legacy system modernization', icon: 'cloud' },
          { title: 'Legacy Modernization', description: 'System upgrades', icon: 'refresh-cw' }
        ],
        benefits: [
          'Increased efficiency',
          'Better decision making',
          'Cost reduction',
          'Competitive advantage'
        ]
      }
    ];

    // Check for existing static services by slug
    const staticSlugs = staticServices.map(service => service.slug);
    const existingStaticServices = await Service.find({ slug: { $in: staticSlugs } });
    
    if (existingStaticServices.length > 0) {
      const existingSlugs = existingStaticServices.map(service => service.slug);
      const newServices = staticServices.filter(service => !existingSlugs.includes(service.slug));
      
      if (newServices.length === 0) {
        return res.json({ 
          message: 'All static services already exist in database', 
          existing: existingStaticServices.length,
          total: staticServices.length
        });
      }
      
      // Insert only new services
      const insertedServices = await Service.insertMany(newServices);
      res.json({ 
        message: 'New static services added successfully', 
        added: insertedServices.length,
        existing: existingStaticServices.length,
        total: staticServices.length
      });
    } else {
      // Insert all static services
      const insertedServices = await Service.insertMany(staticServices);
      res.json({ 
        message: 'All static services added successfully', 
        count: insertedServices.length 
      });
    }
  } catch (error) {
    console.error('Add static services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/services/init
// @desc    Initialize default services (run once)
// @access  Private
router.post('/init', async (req, res) => {
  try {
    const defaultServices = [
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom web applications built with modern technologies and best practices.',
        shortDescription: 'Custom web applications built with modern technologies and best practices.',
        icon: '/icons/web-development.svg',
        image: '/images/web-development.jpg',
        category: 'development',
        featured: true,
        order: 1,
        features: [
          { title: 'React & Node.js', description: 'Modern JavaScript frameworks', icon: 'code' },
          { title: 'Responsive Design', description: 'Mobile-first approach', icon: 'smartphone' },
          { title: 'SEO Optimized', description: 'Search engine friendly', icon: 'search' },
          { title: 'Performance Focused', description: 'Fast loading times', icon: 'zap' }
        ],
        benefits: [
          'Scalable architecture',
          'Cross-browser compatibility',
          'Security best practices',
          '24/7 support'
        ]
      },
      {
        title: 'Mobile Development',
        slug: 'mobile-development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        shortDescription: 'Native and cross-platform mobile applications for iOS and Android.',
        icon: '/icons/mobile-development.svg',
        image: '/images/mobile-development.jpg',
        category: 'development',
        featured: true,
        order: 2,
        features: [
          { title: 'React Native', description: 'Cross-platform development', icon: 'smartphone' },
          { title: 'Flutter', description: 'Google\'s UI toolkit', icon: 'layers' },
          { title: 'Native iOS/Android', description: 'Platform-specific apps', icon: 'code' },
          { title: 'App Store Ready', description: 'Publishing support', icon: 'download' }
        ],
        benefits: [
          'Cross-platform compatibility',
          'Native performance',
          'App store optimization',
          'Push notifications'
        ]
      },
      {
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'Beautiful, intuitive user interfaces that enhance user experience.',
        shortDescription: 'Beautiful, intuitive user interfaces that enhance user experience.',
        icon: '/icons/ui-ux-design.svg',
        image: '/images/ui-ux-design.jpg',
        category: 'design',
        featured: true,
        order: 3,
        features: [
          { title: 'User Research', description: 'Understanding user needs', icon: 'users' },
          { title: 'Wireframing', description: 'Low-fidelity prototypes', icon: 'grid' },
          { title: 'Prototyping', description: 'Interactive mockups', icon: 'play' },
          { title: 'Design Systems', description: 'Consistent design language', icon: 'palette' }
        ],
        benefits: [
          'User-centered design',
          'Improved usability',
          'Brand consistency',
          'Faster development'
        ]
      },
      {
        title: 'DevOps',
        slug: 'devops',
        description: 'Streamline your development and deployment processes with modern DevOps.',
        shortDescription: 'Streamline your development and deployment processes with modern DevOps.',
        icon: '/icons/devops.svg',
        image: '/images/devops.jpg',
        category: 'support',
        featured: false,
        order: 4,
        features: [
          { title: 'CI/CD Pipelines', description: 'Automated deployment', icon: 'git-branch' },
          { title: 'Cloud Infrastructure', description: 'Scalable cloud solutions', icon: 'cloud' },
          { title: 'Monitoring', description: 'Real-time system monitoring', icon: 'activity' },
          { title: 'Security', description: 'Security best practices', icon: 'shield' }
        ],
        benefits: [
          'Faster deployments',
          'Reduced downtime',
          'Better security',
          'Cost optimization'
        ]
      },
      {
        title: 'Consulting',
        slug: 'consulting',
        description: 'Expert guidance to help you make the right technology decisions.',
        shortDescription: 'Expert guidance to help you make the right technology decisions.',
        icon: '/icons/consulting.svg',
        image: '/images/consulting.jpg',
        category: 'consulting',
        featured: false,
        order: 5,
        features: [
          { title: 'Technical Strategy', description: 'Technology roadmap planning', icon: 'target' },
          { title: 'Architecture Review', description: 'System architecture analysis', icon: 'layers' },
          { title: 'Team Training', description: 'Skill development programs', icon: 'users' },
          { title: 'Best Practices', description: 'Industry standards implementation', icon: 'check-circle' }
        ],
        benefits: [
          'Expert guidance',
          'Cost savings',
          'Risk mitigation',
          'Knowledge transfer'
        ]
      },
      {
        title: 'Digital Transformation',
        slug: 'digital-transformation',
        description: 'Transform your business with cutting-edge digital solutions.',
        shortDescription: 'Transform your business with cutting-edge digital solutions.',
        icon: '/icons/digital-transformation.svg',
        image: '/images/digital-transformation.jpg',
        category: 'consulting',
        featured: false,
        order: 6,
        features: [
          { title: 'Process Automation', description: 'Workflow optimization', icon: 'settings' },
          { title: 'Data Analytics', description: 'Business intelligence solutions', icon: 'bar-chart' },
          { title: 'Cloud Migration', description: 'Legacy system modernization', icon: 'cloud' },
          { title: 'Legacy Modernization', description: 'System upgrades', icon: 'refresh-cw' }
        ],
        benefits: [
          'Increased efficiency',
          'Better decision making',
          'Cost reduction',
          'Competitive advantage'
        ]
      }
    ];

    // Check if services already exist
    const existingServices = await Service.find({});
    if (existingServices.length > 0) {
      return res.json({ message: 'Services already initialized', count: existingServices.length });
    }

    // Insert default services
    const insertedServices = await Service.insertMany(defaultServices);
    res.json({ message: 'Default services initialized', count: insertedServices.length });
  } catch (error) {
    console.error('Initialize services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, all } = req.query;
    let query = {};
    
    // If 'all' parameter is not provided, only show active services
    if (!all) {
      query.isActive = { $ne: false }; // Show all except explicitly inactive
    }

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/:slug
// @desc    Get service by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/services
// @desc    Create new service (admin only)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/services/:id
// @desc    Update service (admin only)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete service (admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/categories/all
// @desc    Get all service categories
// @access  Public
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Service.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 