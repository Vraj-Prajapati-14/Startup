import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="contact-section py-20 bg-gray-900 text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get <span className="text-gradient">Started?</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Let's discuss your project and how we can help you achieve your goals.
          </p>
        </motion.div>

        <div className="text-center">
          <Link to="/contact" className="btn btn-primary btn-lg">
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 