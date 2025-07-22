import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../utils/api';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: loading ? [
        { name: 'Loading...', path: '/services' }
      ] : services.length === 0 ? [
        { name: 'No services available', path: '/services' }
      ] : services.map(service => ({
        name: service.title,
        path: `/services/${service.slug}`
      }))
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-text">Bacancy</span>
            <span className="logo-subtitle">Technology</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              {navigation.map((item) => (
                <li key={item.name} className="nav-item">
                  {item.dropdown ? (
                    <div className="dropdown-container">
                      <button
                        className={`nav-link dropdown-toggle ${activeDropdown === item.name ? 'active' : ''}`}
                        onClick={() => toggleDropdown(item.name)}
                        onMouseEnter={() => setActiveDropdown(item.name)}
                      >
                        {item.name}
                        <FiChevronDown className="dropdown-icon" />
                      </button>
                      <ul 
                        className={`dropdown-menu ${activeDropdown === item.name ? 'show' : ''}`}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link to={subItem.path} className="dropdown-link">
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="header-cta">
            <Link to="/contact" className="btn btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? 'show' : ''}`}>
          <ul className="mobile-nav-list">
            {navigation.map((item) => (
              <li key={item.name} className="mobile-nav-item">
                {item.dropdown ? (
                  <div className="mobile-dropdown">
                    <button
                      className={`mobile-nav-link ${activeDropdown === item.name ? 'active' : ''}`}
                      onClick={() => toggleDropdown(item.name)}
                    >
                      {item.name}
                      <FiChevronDown className={`dropdown-icon ${activeDropdown === item.name ? 'rotate' : ''}`} />
                    </button>
                    <ul className={`mobile-dropdown-menu ${activeDropdown === item.name ? 'show' : ''}`}>
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.name}>
                          <Link to={subItem.path} className="mobile-dropdown-link">
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
            <li className="mobile-nav-item">
              <Link to="/contact" className="btn btn-primary w-full">
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 