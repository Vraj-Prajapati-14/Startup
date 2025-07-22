import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { 
  FiCode, 
  FiSmartphone, 
  FiPenTool, 
  FiServer, 
  FiHeadphones, 
  FiTrendingUp,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiSettings,
  FiDatabase,
  FiShield,
  FiZap,
  FiMonitor
} from 'react-icons/fi';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [projects, setProjects] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dynamic icon mapping - can be extended for new services
  const getServiceIcon = (slug) => {
    const iconMap = {
      'web-development': FiCode,
      'mobile-development': FiSmartphone,
      'ui-ux-design': FiPenTool,
      'devops': FiServer,
      'consulting': FiHeadphones,
      'digital-transformation': FiTrendingUp,
      'ecommerce': FiGlobe,
      'saas': FiSettings,
      'fintech': FiDatabase,
      'healthcare': FiShield,
      'education': FiMonitor,
      'other': FiZap
    };
    return iconMap[slug] || FiCode; // Default to FiCode if no match
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch service details
        const serviceRes = await api.get(`/api/services/${slug}`);
        setService(serviceRes.data);
        
        // Fetch projects for this service
        const projectsRes = await api.get(`/api/projects?category=${slug}`);
        setProjects(projectsRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setService(null);
        setProjects([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Service not found.</p>
      </div>
    );
  }

  const ServiceIcon = getServiceIcon(service.slug);

  return (
    <div className="service-detail-page">
      <section className="service-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <ServiceIcon className="text-6xl" />
            </div>
            <h1 className="text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="service-content py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Service Information */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6 sticky top-8"
              >
                <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                {service.features && service.features.length > 0 && (
                  <>
                    <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {feature.title || feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {service.benefits && service.benefits.length > 0 && (
                  <>
                    <h4 className="text-lg font-semibold mb-3 mt-6">Benefits</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            </div>

            {/* Projects Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-8">Our {service.title} Projects</h2>
                
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No projects found for this service.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                          
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 3 && (
                                  <span className="text-gray-500 text-xs">+{project.technologies.length - 3} more</span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                              >
                                <FiExternalLink />
                                Live Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
                              >
                                <FiGithub />
                                Code
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail; 