import React from 'react';
import { motion } from 'framer-motion';
import './StatsSection.css';

const StatsSection = ({ stats }) => {
  return (
    <section className="stats-section py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="stat-card text-center"
            >
              <div className="stat-icon">
                <stat.icon />
              </div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 