import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const res = await axios.get('/api/blog');
      setBlogs(res.data.posts);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      <section className="blog-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Latest insights, tips, and trends from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="blog-content py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
            {loading ? (
              <p>Loading...</p>
            ) : blogs.length === 0 ? (
              <p>No blog posts found.</p>
            ) : (
              <div className="blog-list">
                {blogs.map(blog => (
                  <Link to={`/blog/${blog.slug}`} key={blog._id} className="blog-card">
                    <div className="blog-card-image-wrapper">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="blog-card-image"
                      />
                      <div className="blog-card-logo">
                        {/* Replace with your logo or static text if you want */}
                        BACANCY
                      </div>
                      {blog.author?.image && (
                        <img
                          src={blog.author.image}
                          alt={blog.author.name}
                          className="blog-card-avatar"
                        />
                      )}
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-category">{blog.category}</div>
                      <div className="blog-title">{blog.title}</div>
                      <div className="blog-date-row">
                        <span>{blog.date ? new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                        <span className="arrow">&rarr;</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 