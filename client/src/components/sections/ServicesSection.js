import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getServiceIcon } from '../../utils/serviceIcons';
import './ServicesSection.css';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Fetch featured services for homepage
        const res = await axios.get('/api/services?featured=true&isActive=true');
        setServices(res.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setServices([]);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <section className="services-section py-20 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive software development services to help businesses 
            achieve their digital goals and stay ahead of the competition.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center">
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
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="service-card card-hover"
                >
                  <div className="service-icon">
                    <ServiceIcon />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.shortDescription}</p>
                  {service.features && service.features.length > 0 && (
                    <ul className="service-features">
                      {service.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature.title || feature}</li>
                      ))}
                    </ul>
                  )}
                  <Link to={`/services/${service.slug}`} className="service-link">
                    Learn More
                    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/services" className="btn btn-outline btn-lg">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection; 