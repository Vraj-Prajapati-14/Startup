import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './TestimonialsSection.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const PrevArrow = (props) => (
  <button
    className="carousel-arrow carousel-arrow-left"
    onClick={props.onClick}
    aria-label="Previous"
    style={{ left: '-30px' }}
  >
    <FiChevronLeft size={28} />
  </button>
);

const NextArrow = (props) => (
  <button
    className="carousel-arrow carousel-arrow-right"
    onClick={props.onClick}
    aria-label="Next"
    style={{ right: '-30px' }}
  >
    <FiChevronRight size={28} />
  </button>
);

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        setTestimonials([]);
      }
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : 'empty'}`}>★</span>
    ));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 700, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="testimonials-header"
        >
          <h2 className="testimonials-title">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="testimonials-subtitle">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        {loading ? (
          <div className="loading-state">
            <p>Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="empty-state">
            <p>No testimonials found.</p>
          </div>
        ) : (
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="testimonial-card"
                >
                  <div className="testimonial-header">
                    <div className="client-avatar">
                      <img
                        src={testimonial.clientImage || '/default-avatar.png'}
                        alt={testimonial.clientName}
                        className="avatar-image"
                      />
                    </div>
                    <div className="client-info">
                      <h3 className="client-name">{testimonial.clientName}</h3>
                      <p className="client-position">{testimonial.clientPosition}</p>
                      <p className="client-company">{testimonial.clientCompany}</p>
                    </div>
                  </div>
                  <div className="rating-stars">{renderStars(testimonial.rating)}</div>
                  <blockquote className="testimonial-content">
                    "{testimonial.content}"
                  </blockquote>
                  {testimonial.service && (
                    <div className="service-tag">
                      <span className="tag">
                        {testimonial.service.replace('-', ' ')}
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection; 