import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiTarget, 
  FiEye, 
  FiHeart, 
  FiUsers, 
  FiAward, 
  FiTrendingUp,
  FiCheckCircle,
  FiStar,
  FiGlobe,
  FiCode,
  FiShield,
  FiZap
} from 'react-icons/fi';
import './About.css';

const About = () => {
  const stats = [
    { number: "500+", label: "Projects Completed", icon: FiCode },
    { number: "50+", label: "Team Members", icon: FiUsers },
    { number: "100+", label: "Happy Clients", icon: FiHeart },
    { number: "10+", label: "Years Experience", icon: FiAward }
  ];

  const values = [
    {
      icon: FiTarget,
      title: "Excellence",
      description: "We strive for excellence in every project, delivering the highest quality solutions that exceed expectations."
    },
    {
      icon: FiHeart,
      title: "Passion",
      description: "Our passion for technology drives us to create innovative solutions that make a real impact."
    },
    {
      icon: FiUsers,
      title: "Collaboration",
      description: "We believe in the power of teamwork and collaboration to achieve extraordinary results."
    },
    {
      icon: FiShield,
      title: "Integrity",
      description: "We maintain the highest standards of integrity and transparency in all our relationships."
    },
    {
      icon: FiZap,
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to stay ahead of the curve."
    },
    {
      icon: FiGlobe,
      title: "Global Impact",
      description: "We create solutions that have a positive impact on businesses and communities worldwide."
    }
  ];

  const milestones = [
    {
      year: "2014",
      title: "Company Founded",
      description: "Bacancy Technology was established with a vision to transform businesses through innovative technology solutions."
    },
    {
      year: "2016",
      title: "First Major Client",
      description: "Secured our first enterprise client and successfully delivered a complex e-commerce platform."
    },
    {
      year: "2018",
      title: "Team Expansion",
      description: "Grew our team to 25+ developers and expanded our service offerings to include mobile development."
    },
    {
      year: "2020",
      title: "Global Recognition",
      description: "Received industry recognition and expanded our client base to international markets."
    },
    {
      year: "2022",
      title: "Innovation Hub",
      description: "Launched our innovation hub and started working on cutting-edge technologies like AI and blockchain."
    },
    {
      year: "2024",
      title: "Future Forward",
      description: "Continuing to lead the industry with advanced solutions and expanding our global presence."
    }
  ];

  const technologies = [
    "React.js", "Node.js", "Python", "Java", "React Native", "Flutter",
    "AWS", "Azure", "Google Cloud", "MongoDB", "PostgreSQL", "Redis",
    "Docker", "Kubernetes", "Machine Learning", "AI", "Blockchain"
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About Bacancy Technology</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We are a leading software development company passionate about creating innovative digital solutions 
              that transform businesses and drive growth in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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
                className="text-center"
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

      {/* Our Story Section */}
      <section className="story-section py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2014, Bacancy Technology began as a small team of passionate developers with a big vision: 
                to transform businesses through innovative technology solutions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Over the years, we've grown from a startup to a trusted technology partner for companies worldwide. 
                Our journey has been marked by continuous learning, adaptation, and a relentless focus on delivering 
                exceptional value to our clients.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Today, we're proud to have completed over 500 projects, served 100+ clients, and built a team of 
                50+ talented professionals who share our passion for technology and innovation.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="story-image"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
                <FiUsers className="text-6xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">Our Team</h3>
                <p className="text-lg opacity-90">
                  50+ passionate professionals dedicated to delivering excellence
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mission-card"
            >
              <div className="mission-icon">
                <FiTarget />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600">
                To empower businesses with innovative technology solutions that drive growth, 
                efficiency, and competitive advantage in the digital marketplace.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="vision-card"
            >
              <div className="vision-icon">
                <FiEye />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600">
                To be the leading technology partner that transforms ideas into powerful digital 
                solutions, shaping the future of business through innovation and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our culture of excellence and innovation.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="value-card"
              >
                <div className="value-icon">
                  <value.icon />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="timeline-section py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A decade of growth, innovation, and success in the technology industry.
            </p>
          </motion.div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="technologies-section py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Technologies We Master</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We work with cutting-edge technologies to deliver modern, scalable, and efficient solutions.
            </p>
          </motion.div>
          <div className="technologies-grid">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="technology-tag"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Bacancy Technology?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with business acumen to deliver solutions that drive real results.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiStar,
                title: "Proven Track Record",
                description: "10+ years of experience with 500+ successful projects across various industries."
              },
              {
                icon: FiUsers,
                title: "Expert Team",
                description: "50+ skilled professionals with expertise in the latest technologies and methodologies."
              },
              {
                icon: FiTrendingUp,
                title: "Innovation Focus",
                description: "Constantly exploring new technologies to provide cutting-edge solutions."
              },
              {
                icon: FiShield,
                title: "Quality Assurance",
                description: "Rigorous testing and quality control processes ensure reliable, bug-free applications."
              },
              {
                icon: FiGlobe,
                title: "Global Reach",
                description: "Serving clients worldwide with 24/7 support and maintenance services."
              },
              {
                icon: FiCheckCircle,
                title: "Client Success",
                description: "100+ satisfied clients who trust us with their digital transformation needs."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-16 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your business goals with our innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-white btn-lg">
                Get Free Consultation
              </Link>
              <Link to="/portfolio" className="btn btn-outline-white btn-lg">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 