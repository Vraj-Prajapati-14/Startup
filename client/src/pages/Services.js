import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { 
  FiCode, 
  FiSmartphone, 
  FiPenTool, 
  FiServer, 
  FiHeadphones, 
  FiTrendingUp,
  FiGlobe,
  FiSettings,
  FiDatabase,
  FiShield,
  FiZap,
  FiMonitor
} from 'react-icons/fi';

const Services = () => {
  const [services, setServices] = useState([]);
  const [projectCounts, setProjectCounts] = useState({});
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
        // Fetch services
        const servicesRes = await api.get('/api/services?isActive=true');
        setServices(servicesRes.data);

        // Fetch project counts for each service
        const counts = {};
        for (const service of servicesRes.data) {
          const projectsRes = await api.get(`/api/projects?category=${service.slug}`);
          counts[service.slug] = projectsRes.data.length;
        }
        setProjectCounts(counts);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setServices([]);
        setProjectCounts({});
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="services-page">
      <section className="services-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive software development services to help your business grow and succeed.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="services-content py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end software development solutions tailored to your business needs.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No services found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const ServiceIcon = getServiceIcon(service.slug);
                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <ServiceIcon className="text-4xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-center">{service.shortDescription}</p>
                    
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4">
                        <ul className="space-y-1">
                          {service.features.slice(0, 4).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                              {feature.title || feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/services/${service.slug}`} 
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        Learn More →
                      </Link>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {projectCounts[service.slug] || 0} Projects
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Let's discuss your project requirements and find the perfect solution for your business.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 