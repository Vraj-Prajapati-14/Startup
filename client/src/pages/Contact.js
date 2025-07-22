import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiSend,
  FiCheck,
  FiUser,
  FiBriefcase,
  FiMessageSquare
} from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/api/services?isActive=true');
        setServices(res.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setServices([]);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Thank you for your message! We will get back to you soon.');
        reset();
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['info@bacancy.com', 'support@bacancy.com'],
      link: 'mailto:info@bacancy.com'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      link: 'tel:+15551234567'
    },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      details: ['123 Tech Street', 'Digital City, DC 12345'],
      link: 'https://maps.google.com'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      link: null
    }
  ];

  const budgets = [
    '$10k - $25k',
    '$25k - $50k', 
    '$50k - $100k',
    '$100k+',
    'Not specified'
  ];

  const timelines = [
    '1-3 months',
    '3-6 months',
    '6-12 months', 
    '12+ months',
    'Not specified'
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how we can help bring your ideas to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're here to help and answer any questions you might have. We look forward to hearing from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="contact-info-card"
              >
                <div className="contact-info-icon">
                  <info.icon />
                </div>
                <h3 className="contact-info-title">{info.title}</h3>
                <div className="contact-info-details">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex}>{detail}</p>
                  ))}
                </div>
                {info.link && (
                  <a 
                    href={info.link} 
                    className="contact-info-link"
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    Contact Now
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FiUser className="form-icon" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      {...register('name', { required: 'Name is required' })}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <FiMail className="form-icon" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">
                      <FiPhone className="form-icon" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      {...register('phone')}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">
                      <FiBriefcase className="form-icon" />
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Enter your company name"
                      {...register('company')}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    <FiMessageSquare className="form-icon" />
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="What is this regarding?"
                    {...register('subject', { required: 'Subject is required' })}
                    className={errors.subject ? 'error' : ''}
                  />
                  {errors.subject && <span className="error-message">{errors.subject.message}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service">Service Interest</label>
                    <select id="service" {...register('service')}>
                      <option value="">Select a service</option>
                      {loading ? (
                        <option value="" disabled>Loading services...</option>
                      ) : services.length === 0 ? (
                        <option value="" disabled>No services available</option>
                      ) : (
                        services.map((service, index) => (
                          <option key={service._id} value={service.slug}>
                            {service.title}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select id="budget" {...register('budget')}>
                      <option value="">Select budget</option>
                      {budgets.map((budget, index) => (
                        <option key={index} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Project Timeline</label>
                  <select id="timeline" {...register('timeline')}>
                    <option value="">Select timeline</option>
                    {timelines.map((timeline, index) => (
                      <option key={index} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tell us about your project requirements..."
                    {...register('message', { required: 'Message is required' })}
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && <span className="error-message">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map/Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="contact-map-section"
            >
              <div className="contact-map">
                <div className="map-placeholder">
                  <FiMapPin className="map-icon" />
                  <p>Interactive map would be embedded here</p>
                  <p className="text-sm text-gray-500">Google Maps or similar service</p>
                </div>
              </div>

              <div className="contact-cta mt-8">
                <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Let's discuss your project requirements and how we can help you achieve your goals.
                </p>
                <div className="cta-features">
                  <div className="cta-feature">
                    <FiCheck className="text-green-500" />
                    <span>Free consultation</span>
                  </div>
                  <div className="cta-feature">
                    <FiCheck className="text-green-500" />
                    <span>Quick response time</span>
                  </div>
                  <div className="cta-feature">
                    <FiCheck className="text-green-500" />
                    <span>Flexible engagement models</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 