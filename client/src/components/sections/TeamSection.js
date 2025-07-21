import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TeamSection = () => {
  return (
    <section className="team-section py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our talented team of developers, designers, and consultants are here to bring your vision to life.
          </p>
        </motion.div>

        <div className="text-center">
          <Link to="/team" className="btn btn-primary btn-lg">
            Meet the Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 