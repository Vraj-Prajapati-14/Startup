import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PortfolioSection = () => {
  return (
    <section className="portfolio-section py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our latest projects and see how we've helped businesses achieve their digital goals.
          </p>
        </motion.div>

        <div className="text-center">
          <Link to="/portfolio" className="btn btn-primary btn-lg">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection; 