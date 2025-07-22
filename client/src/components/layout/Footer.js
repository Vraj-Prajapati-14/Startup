import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram,
  FiGithub,
  FiArrowUp
} from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/team' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
      { name: 'Blog', path: '/blog' }
    ],
    resources: [
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: 'Whitepapers', path: '/whitepapers' },
      { name: 'Webinars', path: '/webinars' },
      { name: 'FAQ', path: '/faq' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'GDPR', path: '/gdpr' }
    ]
  };

  const socialLinks = [
    { icon: FiFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FiTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FiGithub, url: 'https://github.com', label: 'GitHub' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-section company-info">
            <Link to="/" className="footer-logo">
              <span className="logo-text">Bacancy</span>
              <span className="logo-subtitle">Technology</span>
            </Link>
            <p className="company-description">
              We are a leading software development company that specializes in creating 
              innovative digital solutions. Our team of experts combines creativity with 
              technical excellence to deliver outstanding results.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>info@bacancy.com</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </div>
            </div>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              {loading ? (
                <li>Loading services...</li>
              ) : services.length === 0 ? (
                <li>No services available</li>
              ) : (
                services.slice(0, 5).map((service, index) => (
                  <li key={service._id}>
                    <Link to={`/services/${service.slug}`} className="footer-link">
                      {service.title}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Bacancy Technology. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-bottom-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </button>
    </footer>
  );
};

export default Footer; 