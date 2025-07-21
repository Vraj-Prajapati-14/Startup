import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiCheck, FiX } from 'react-icons/fi';
import './HeroSection.css';

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section min-h-screen flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="hero-bg">
        <div className="hero-bg-gradient"></div>
        <div className="hero-bg-pattern"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-badge"
            >
              <FiCheck className="text-green-500" />
              <span>Trusted by 500+ companies worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-title"
            >
              We Build
              <span className="text-gradient"> Digital Solutions</span>
              That Drive Growth
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-description"
            >
              Transform your business with cutting-edge software solutions. 
              We specialize in web development, mobile apps, and digital innovation 
              that helps companies scale and succeed in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hero-features"
            >
              <div className="feature-item">
                <FiCheck className="text-green-500" />
                <span>Custom Software Development</span>
              </div>
              <div className="feature-item">
                <FiCheck className="text-green-500" />
                <span>Mobile App Development</span>
              </div>
              <div className="feature-item">
                <FiCheck className="text-green-500" />
                <span>UI/UX Design Services</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero-actions"
            >
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start Your Project
                <FiArrowRight />
              </Link>
              <button className="btn btn-outline btn-lg" onClick={() => setIsVideoOpen(true)}>
                <FiPlay />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hero-stats"
            >
              <div className="stat-item">
                <div className="stat-number" tabIndex={0} onClick={() => alert('Thanks for noticing our stats!')}>500+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Team Experts</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-visual"
          >
            <div className="hero-image-container">
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80" 
                  alt="Digital solutions" 
                  className="main-image"
                />
                <div className="floating-card card-1">
                  <div className="card-icon">📱</div>
                  <div className="card-content">
                    <h4>Mobile Apps</h4>
                    <p>Native & Cross-platform</p>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon">🌐</div>
                  <div className="card-content">
                    <h4>Web Apps</h4>
                    <p>Modern & Responsive</p>
                  </div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon">⚡</div>
                  <div className="card-content">
                    <h4>Fast & Secure</h4>
                    <p>Performance focused</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="video-modal" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsVideoOpen(false)}>
              <FiX size={24} />
            </button>
            <video src="/videos/introduction.mp4" controls autoPlay style={{ width: '100%', borderRadius: '12px' }} />
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="scroll-indicator"
        onClick={scrollToContact}
      >
        <div className="scroll-arrow"></div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default HeroSection; 