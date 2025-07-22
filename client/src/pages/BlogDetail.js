import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/blog/${slug}`);
        setBlog(res.data);
      } catch (err) {
        setBlog(null);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog post not found.</div>;

  return (
    <div className="blog-detail-page">
      <section className="blog-detail-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1>{blog.title}</h1>
            <p>{blog.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="blog-detail-content">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="blog-detail-image"
          />
          <div className="blog-detail-meta-row">
            {blog.author?.image && (
              <img
                src={blog.author.image}
                alt={blog.author.name}
                className="blog-detail-avatar"
              />
            )}
            <div className="blog-detail-meta-info">
              <div className="author">{blog.author?.name}</div>
              <div className="category">{blog.category}</div>
              {blog.date && (
                <div className="date">
                  {new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
            </div>
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </section>
    </div>
  );
};

export default BlogDetail; 