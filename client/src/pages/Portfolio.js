import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiExternalLink,
  FiCalendar,
  FiCheckCircle,
} from 'react-icons/fi';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const caseStudies = [
    {
      id: 1,
      title: "E-Commerce Platform for Fashion Retailer",
      subtitle: "Modern React.js E-commerce Solution",
      category: "web-development",
      categoryLabel: "Web Development",
      client: "StyleHub Fashion",
      duration: "4 months",
      team: "6 developers",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      challenge: "A leading fashion retailer needed a modern, scalable e-commerce platform to replace their outdated system and improve customer experience.",
      solution: "Built a custom React.js e-commerce platform with Node.js backend, featuring advanced product filtering, real-time inventory management, and seamless payment integration.",
      results: [
        "40% increase in online sales",
        "60% improvement in page load speed",
        "25% reduction in cart abandonment",
        "99.9% uptime achieved"
      ],
      technologies: ["React.js", "Node.js", "MongoDB", "Stripe", "AWS"],
      features: [
        "Advanced product search and filtering",
        "Real-time inventory management",
        "Multi-payment gateway integration",
        "Mobile-responsive design",
        "Admin dashboard with analytics"
      ],
      testimonial: {
        text: "The new platform has transformed our online business. Sales have increased significantly and our customers love the improved shopping experience.",
        author: "Sarah Johnson",
        position: "CEO, StyleHub Fashion"
      },
      links: {
        live: "https://stylehub-demo.com",
        github: "https://github.com/company/stylehub"
      },
      stats: {
        users: "50K+",
        transactions: "100K+",
        revenue: "$2M+"
      }
    },
    {
      id: 2,
      title: "Healthcare Management System",
      subtitle: "Comprehensive Patient Care Platform",
      category: "healthcare",
      categoryLabel: "Healthcare",
      client: "MediCare Plus",
      duration: "6 months",
      team: "8 developers",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      challenge: "A healthcare provider needed a comprehensive system to manage patient records, appointments, and billing while ensuring HIPAA compliance.",
      solution: "Developed a secure healthcare management system with role-based access control, automated appointment scheduling, and integrated billing modules.",
      results: [
        "50% reduction in appointment scheduling time",
        "Improved patient satisfaction by 35%",
        "100% HIPAA compliance achieved",
        "Streamlined billing process"
      ],
      technologies: ["React.js", "Python", "PostgreSQL", "Docker", "AWS"],
      features: [
        "Patient portal with secure access",
        "Automated appointment scheduling",
        "Electronic health records (EHR)",
        "Billing and insurance integration",
        "HIPAA-compliant security"
      ],
      testimonial: {
        text: "This system has revolutionized how we manage patient care. The efficiency gains are remarkable and our staff can focus more on patient care.",
        author: "Dr. Michael Chen",
        position: "Medical Director, MediCare Plus"
      },
      links: {
        live: "https://medicare-demo.com",
        github: "https://github.com/company/medicare"
      },
      stats: {
        patients: "10K+",
        appointments: "25K+",
        efficiency: "50%+"
      }
    },
    {
      id: 3,
      title: "Fintech Mobile App",
      subtitle: "Cross-platform Financial Services App",
      category: "mobile-development",
      categoryLabel: "Mobile Development",
      client: "PaySmart Solutions",
      duration: "5 months",
      team: "7 developers",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      challenge: "A fintech startup needed a secure, user-friendly mobile app for digital payments, money transfers, and financial management.",
      solution: "Built a React Native app with advanced security features, real-time transaction processing, and intuitive user interface for seamless financial operations.",
      results: [
        "100K+ app downloads in first 3 months",
        "95% user satisfaction rating",
        "99.9% transaction success rate",
        "Reduced transaction time by 70%"
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Stripe"],
      features: [
        "Secure biometric authentication",
        "Real-time money transfers",
        "Bill payment automation",
        "Financial analytics dashboard",
        "Multi-currency support"
      ],
      testimonial: {
        text: "The app exceeded our expectations. Our users love the seamless experience and security features. It's been a game-changer for our business.",
        author: "Alex Rodriguez",
        position: "CTO, PaySmart Solutions"
      },
      links: {
        live: "https://paysmart-demo.com",
        github: "https://github.com/company/paysmart"
      },
      stats: {
        downloads: "100K+",
        transactions: "500K+",
        rating: "4.8/5"
      }
    },
    {
      id: 4,
      title: "Educational Learning Platform",
      subtitle: "Interactive Online Learning System",
      category: "education",
      categoryLabel: "Education",
      client: "EduTech Academy",
      duration: "7 months",
      team: "9 developers",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      challenge: "An educational institution needed a comprehensive online learning platform to deliver courses, track student progress, and facilitate virtual classrooms.",
      solution: "Created an interactive learning platform with video conferencing, progress tracking, gamification elements, and comprehensive analytics for educators.",
      results: [
        "10K+ students enrolled",
        "85% course completion rate",
        "40% improvement in student engagement",
        "Scalable to multiple institutions"
      ],
      technologies: ["React.js", "Node.js", "WebRTC", "MongoDB", "AWS"],
      features: [
        "Live video conferencing",
        "Interactive course content",
        "Progress tracking and analytics",
        "Gamification and rewards",
        "Multi-language support"
      ],
      testimonial: {
        text: "This platform has transformed how we deliver education. Students are more engaged and we can reach learners worldwide effectively.",
        author: "Dr. Emily Watson",
        position: "Dean, EduTech Academy"
      },
      links: {
        live: "https://edutech-demo.com",
        github: "https://github.com/company/edutech"
      },
      stats: {
        students: "10K+",
        courses: "200+",
        completion: "85%"
      }
    },
    {
      id: 5,
      title: "Logistics Management System",
      subtitle: "End-to-End Supply Chain Solution",
      category: "logistics",
      categoryLabel: "Logistics",
      client: "Global Logistics Corp",
      duration: "8 months",
      team: "10 developers",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      challenge: "A global logistics company needed a comprehensive system to manage shipments, track deliveries, and optimize routes across multiple countries.",
      solution: "Developed a logistics management system with real-time tracking, route optimization, warehouse management, and comprehensive reporting capabilities.",
      results: [
        "30% reduction in delivery time",
        "25% cost savings in operations",
        "Real-time tracking for all shipments",
        "Improved customer satisfaction"
      ],
      technologies: ["React.js", "Python", "PostgreSQL", "Redis", "Google Maps API"],
      features: [
        "Real-time shipment tracking",
        "Route optimization algorithms",
        "Warehouse management system",
        "Customer portal",
        "Advanced analytics dashboard"
      ],
      testimonial: {
        text: "The system has revolutionized our operations. We can now track every shipment in real-time and optimize our routes for maximum efficiency.",
        author: "Robert Thompson",
        position: "Operations Director, Global Logistics Corp"
      },
      links: {
        live: "https://logistics-demo.com",
        github: "https://github.com/company/logistics"
      },
      stats: {
        shipments: "1M+",
        countries: "50+",
        efficiency: "30%+"
      }
    },
    {
      id: 6,
      title: "Real Estate Management Platform",
      subtitle: "Comprehensive Property Management Solution",
      category: "real-estate",
      categoryLabel: "Real Estate",
      client: "Urban Properties",
      duration: "6 months",
      team: "8 developers",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      challenge: "A real estate company needed a platform to manage properties, handle tenant applications, process rent payments, and maintain property records.",
      solution: "Built a comprehensive real estate management platform with property listings, tenant portal, payment processing, and maintenance request tracking.",
      results: [
        "50% increase in property management efficiency",
        "Streamlined tenant onboarding process",
        "Automated rent collection system",
        "Improved property maintenance tracking"
      ],
      technologies: ["React.js", "Node.js", "MongoDB", "Stripe", "AWS"],
      features: [
        "Property listing and search",
        "Tenant application portal",
        "Automated rent collection",
        "Maintenance request system",
        "Financial reporting dashboard"
      ],
      testimonial: {
        text: "This platform has streamlined our entire property management process. We can now handle more properties efficiently with better tenant satisfaction.",
        author: "Jennifer Martinez",
        position: "Property Manager, Urban Properties"
      },
      links: {
        live: "https://realestate-demo.com",
        github: "https://github.com/company/realestate"
      },
      stats: {
        properties: "500+",
        tenants: "2K+",
        efficiency: "50%+"
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'mobile-development', label: 'Mobile Development' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'real-estate', label: 'Real Estate' }
  ];

  const filteredCaseStudies = activeFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="portfolio-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our successful projects and see how we've helped businesses transform their digital presence and achieve remarkable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filters py-8 bg-gray-50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="portfolio-content py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="case-study-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Project Image */}
                <div className="case-study-image">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                      <p className="text-sm opacity-90">{study.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {study.categoryLabel}
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar className="mr-1" />
                      {study.duration}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{study.challenge}</p>

                  {/* Key Results */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {study.results.slice(0, 2).map((result, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {study.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                      {study.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{study.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    {Object.entries(study.stats).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-blue-600">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="case-study-links">
                    <Link
                      to={`/portfolio/${study.id}`}
                      className="case-study-action"
                    >
                      View Case Study
                    </Link>
                    {study.links.live && (
                      <a
                        href={study.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="case-study-external"
                        aria-label="View Live Project"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No case studies found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta py-16 bg-gray-50">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business. 
              Our team is ready to turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Free Consultation
              </Link>
              <Link to="/services" className="btn btn-outline btn-lg">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio; 