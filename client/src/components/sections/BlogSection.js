import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  return (
    <section className="blog-section py-20 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our team of experts.
          </p>
        </motion.div>

        <div className="text-center">
          <Link to="/blog" className="btn btn-primary btn-lg">
            Read Our Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 