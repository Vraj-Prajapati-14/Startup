import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="project-detail-page">
      <section className="project-detail-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Project Details</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Detailed information about project {id}.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="project-detail-content py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Project Information</h2>
            <p className="text-lg text-gray-600">
              Detailed project information will be displayed here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail; 