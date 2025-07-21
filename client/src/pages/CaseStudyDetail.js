import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiExternalLink, 
  FiGithub, 
  FiUsers, 
  FiCalendar, 
  FiTarget,
  FiCheckCircle,
  FiStar,
  FiTrendingUp,
  FiShield,
  FiZap
} from 'react-icons/fi';
import './CaseStudyDetail.css';

const CaseStudyDetail = () => {
  const { id } = useParams();

  // Static case study data (in real app, this would come from API)
  const caseStudies = {
    1: {
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
      challenge: "A leading fashion retailer needed a modern, scalable e-commerce platform to replace their outdated system and improve customer experience. Their existing platform was slow, had poor mobile responsiveness, and lacked essential features like real-time inventory management and advanced search capabilities.",
      solution: "Built a custom React.js e-commerce platform with Node.js backend, featuring advanced product filtering, real-time inventory management, and seamless payment integration. The solution included a comprehensive admin dashboard, mobile-responsive design, and integration with multiple payment gateways.",
      results: [
        "40% increase in online sales within 3 months",
        "60% improvement in page load speed",
        "25% reduction in cart abandonment rate",
        "99.9% uptime achieved",
        "50% increase in mobile conversions"
      ],
      technologies: ["React.js", "Node.js", "MongoDB", "Stripe", "AWS", "Redis", "Elasticsearch"],
      features: [
        "Advanced product search and filtering",
        "Real-time inventory management",
        "Multi-payment gateway integration",
        "Mobile-responsive design",
        "Admin dashboard with analytics",
        "Customer review system",
        "Wishlist functionality",
        "Order tracking system"
      ],
      testimonial: {
        text: "The new platform has transformed our online business. Sales have increased significantly and our customers love the improved shopping experience. The team delivered exactly what we needed and more.",
        author: "Sarah Johnson",
        position: "CEO, StyleHub Fashion",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
      },
      links: {
        live: "https://stylehub-demo.com",
        github: "https://github.com/company/stylehub"
      },
      stats: {
        users: "50K+",
        transactions: "100K+",
        revenue: "$2M+",
        conversion: "3.2%"
      },
      process: [
        {
          phase: "Discovery & Planning",
          description: "Analyzed existing system, gathered requirements, and created detailed project roadmap",
          duration: "2 weeks"
        },
        {
          phase: "Design & Prototyping",
          description: "Created wireframes, user flows, and interactive prototypes for user testing",
          duration: "3 weeks"
        },
        {
          phase: "Development",
          description: "Built the platform using React.js frontend and Node.js backend with agile methodology",
          duration: "12 weeks"
        },
        {
          phase: "Testing & QA",
          description: "Comprehensive testing including unit tests, integration tests, and user acceptance testing",
          duration: "2 weeks"
        },
        {
          phase: "Deployment & Launch",
          description: "Deployed to production environment and launched with monitoring and support",
          duration: "1 week"
        }
      ]
    },
    2: {
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
      challenge: "A healthcare provider needed a comprehensive system to manage patient records, appointments, and billing while ensuring HIPAA compliance. Their existing paper-based system was inefficient and prone to errors.",
      solution: "Developed a secure healthcare management system with role-based access control, automated appointment scheduling, and integrated billing modules. The system includes patient portals, electronic health records, and comprehensive reporting.",
      results: [
        "50% reduction in appointment scheduling time",
        "Improved patient satisfaction by 35%",
        "100% HIPAA compliance achieved",
        "Streamlined billing process with 40% faster processing",
        "Reduced administrative workload by 60%"
      ],
      technologies: ["React.js", "Python", "PostgreSQL", "Docker", "AWS", "HIPAA", "HL7"],
      features: [
        "Patient portal with secure access",
        "Automated appointment scheduling",
        "Electronic health records (EHR)",
        "Billing and insurance integration",
        "HIPAA-compliant security",
        "Telemedicine integration",
        "Prescription management",
        "Lab results management"
      ],
      testimonial: {
        text: "This system has revolutionized how we manage patient care. The efficiency gains are remarkable and our staff can focus more on patient care rather than administrative tasks.",
        author: "Dr. Michael Chen",
        position: "Medical Director, MediCare Plus",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
      },
      links: {
        live: "https://medicare-demo.com",
        github: "https://github.com/company/medicare"
      },
      stats: {
        patients: "10K+",
        appointments: "25K+",
        efficiency: "50%+",
        satisfaction: "95%"
      },
      process: [
        {
          phase: "Requirements Analysis",
          description: "Gathered detailed requirements from medical staff and administrators",
          duration: "3 weeks"
        },
        {
          phase: "Compliance Planning",
          description: "Ensured HIPAA compliance and security requirements",
          duration: "2 weeks"
        },
        {
          phase: "Development",
          description: "Built the system with security-first approach and regular compliance reviews",
          duration: "20 weeks"
        },
        {
          phase: "Testing & Validation",
          description: "Comprehensive testing including security audits and user training",
          duration: "3 weeks"
        },
        {
          phase: "Deployment",
          description: "Phased deployment with staff training and support",
          duration: "2 weeks"
        }
      ]
    }
  };

  const caseStudy = caseStudies[id];

  if (!caseStudy) {
    return (
      <div className="case-study-not-found">
        <div className="container">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
            <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist.</p>
            <Link to="/portfolio" className="btn btn-primary">
              <FiArrowLeft className="mr-2" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="case-study-detail">
      {/* Hero Section */}
      <section className="case-study-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/portfolio" className="inline-flex items-center text-white mb-6 hover:text-blue-200 transition-colors">
              <FiArrowLeft className="mr-2" />
              Back to Portfolio
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm mb-4 inline-block">
                  {caseStudy.categoryLabel}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{caseStudy.title}</h1>
                <p className="text-xl mb-6 opacity-90">{caseStudy.subtitle}</p>
                
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center">
                    <FiUsers className="mr-2" />
                    <span>{caseStudy.team}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    <span>{caseStudy.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FiTarget className="mr-2" />
                    <span>{caseStudy.client}</span>
                  </div>
                </div>
              </div>
              
              <div className="case-study-hero-image">
                <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                    <p className="opacity-90">{caseStudy.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="project-overview py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-4">Project Stats</h3>
              <div className="space-y-4">
                {Object.entries(caseStudy.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{key}</span>
                    <span className="font-bold text-blue-600">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="solution-section py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Solution</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center leading-relaxed">
              {caseStudy.solution}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="results-section py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Key Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-3">
                    <FiTrendingUp className="text-green-500 mr-3 text-xl" />
                    <h3 className="font-semibold">Result {index + 1}</h3>
                  </div>
                  <p className="text-gray-700">{result}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies & Features */}
      <section className="tech-features-section py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
              <div className="grid grid-cols-2 gap-3">
                {caseStudy.technologies.map((tech, index) => (
                  <div key={index} className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-center">
                    <span className="font-medium text-gray-800">{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="space-y-3">
                {caseStudy.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="process-section py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {caseStudy.process.map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{phase.phase}</h3>
                  <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                  <span className="text-xs text-blue-600 font-medium">{phase.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial-section py-16 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <FiStar className="text-yellow-400 text-2xl" />
            </div>
            <blockquote className="text-xl italic mb-6">
              "{caseStudy.testimonial.text}"
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <FiUsers className="text-xl" />
              </div>
              <div className="text-left">
                <div className="font-semibold">{caseStudy.testimonial.author}</div>
                <div className="text-sm opacity-90">{caseStudy.testimonial.position}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Free Consultation
              </Link>
              <Link to="/portfolio" className="btn btn-outline btn-lg">
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail; 