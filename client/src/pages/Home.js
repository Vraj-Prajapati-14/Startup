import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiPlay, 
  FiCheck, 
  FiUsers,
  FiAward,
  FiGlobe,
  FiCode,
  FiSmartphone,
  FiPenTool,
  FiServer,
  FiHeadphones
} from 'react-icons/fi';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import TeamSection from '../components/sections/TeamSection';
import BlogSection from '../components/sections/BlogSection';
import ContactSection from '../components/sections/ContactSection';
import StatsSection from '../components/sections/StatsSection';
import './Home.css';

const Home = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const stats = [
    { icon: FiUsers, number: '500+', label: 'Happy Clients' },
    { icon: FiAward, number: '50+', label: 'Awards Won' },
    { icon: FiGlobe, number: '100+', label: 'Countries Served' },
    { icon: FiCode, number: '1000+', label: 'Projects Completed' }
  ];

  const features = [
    {
      icon: FiCode,
      title: 'Custom Development',
      description: 'Tailored solutions built from scratch to meet your unique business requirements.'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile-First Approach',
      description: 'Responsive designs that work seamlessly across all devices and platforms.'
    },
    {
      icon: FiPenTool,
      title: 'Modern UI/UX',
      description: 'Beautiful, intuitive interfaces that enhance user experience and engagement.'
    },
    {
      icon: FiServer,
      title: 'Scalable Architecture',
      description: 'Robust, scalable solutions that grow with your business needs.'
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and maintenance for your applications.'
    },
    {
      icon: FiAward,
      title: 'Quality Assurance',
      description: 'Rigorous testing and quality checks to ensure flawless performance.'
    }
  ];

  const technologies = [
    'React', 'Node.js', 'Python', 'Java', 'Angular', 'Vue.js', 
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Flutter'
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* About Section */}
      <section className="about-section py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Transforming Ideas Into
                <span className="text-gradient"> Digital Reality</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We are a leading software development company that specializes in creating innovative digital solutions. 
                Our team of experts combines creativity with technical excellence to deliver outstanding results.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <FiCheck className="text-green-500 text-xl" />
                  <span className="text-gray-700">Custom software development</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="text-green-500 text-xl" />
                  <span className="text-gray-700">Mobile app development</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="text-green-500 text-xl" />
                  <span className="text-gray-700">UI/UX design services</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="text-green-500 text-xl" />
                  <span className="text-gray-700">Cloud solutions & DevOps</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about" className="btn btn-primary btn-lg">
                  Learn More
                  <FiArrowRight />
                </Link>
                <button 
                  className="btn btn-outline btn-lg"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <FiPlay />
                  Watch Video
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                  <p className="text-gray-200">Dedicated professionals working together</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Features Section */}
      <section className="features-section py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Why Choose <span className="text-gradient">Bacancy</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We deliver exceptional results through our proven methodology, experienced team, and commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card card-hover p-8 rounded-xl border border-gray-200"
              >
                <div className="feature-icon mb-6">
                  <feature.icon className="text-4xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="technologies-section py-20 bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Technologies We <span className="text-gradient">Master</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We work with cutting-edge technologies to build modern, scalable, and efficient solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="tech-item bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-white font-medium">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Team Section */}
      <TeamSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="video-modal fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ×
            </button>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-white">Video player would go here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 