import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Avatar, CircularProgress, Alert, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../../utils/api';

const allowedCategories = [
  'technology', 'development', 'design', 'business', 'startup', 'tutorial', 'news', 'case-study'
];

const emptyBlog = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  authorName: '',
  category: '',
  featuredImage: '',
  published: false
};

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    setBlogs(res.data.posts);
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleOpen = (blog = null) => {
    setEditing(blog);
    setForm(blog ? {
      ...blog,
      authorName: blog.author?.name || '',
      published: blog.published || false // Ensure published is set for editing
    } : emptyBlog);
    setErrors({});
    setFormError('');
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditing(null); setForm(emptyBlog); setErrors({}); setFormError(''); };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('image', file);
    data.append('type', 'blog');
    try {
      const res = await api.post('/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('adminToken') } });
      setForm(f => ({ ...f, featuredImage: res.data.url }));
    } catch (err) {
      setFormError('Image upload failed: ' + (err.response?.data?.message || err.message));
    }
    setUploading(false);
  };

  const handleCheck = e => setForm({ ...form, [e.target.name]: e.target.checked });

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = 'Title is required';
    if (!form.slug) newErrors.slug = 'Slug is required';
    if (!form.excerpt) newErrors.excerpt = 'Excerpt is required';
    if (!form.content) newErrors.content = 'Content is required';
    if (!form.authorName) newErrors.authorName = 'Author name is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.featuredImage) newErrors.featuredImage = 'Featured image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      author: { name: form.authorName },
      category: form.category,
      featuredImage: form.featuredImage,
      published: form.published
    };
    try {
      if (editing) {
        await api.put(`/api/blog/${editing._id}`, payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
      } else {
        await api.post('/api/blog', payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
      }
      fetchBlogs();
      handleClose();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Submission failed');
    }
  };

  const handleDelete = async id => {
    await api.delete(`/api/blog/${id}`, { headers: { Authorization: localStorage.getItem('adminToken') } });
    fetchBlogs();
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Blog Posts</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Post</Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Published</TableCell>
                <TableCell>Excerpt</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map(blog => (
                <TableRow key={blog._id}>
                  <TableCell><Avatar src={blog.featuredImage} alt={blog.title} /></TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>{blog.author?.name}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      color: blog.published ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}>
                      {blog.published ? '✓ Published' : '✗ Draft'}
                    </Box>
                  </TableCell>
                  <TableCell>{blog.excerpt}</TableCell>
                  <TableCell>{blog.slug}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(blog)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(blog._id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Post' : 'Add Post'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth margin="normal" required error={!!errors.title} helperText={errors.title} />
            <TextField label="Slug" name="slug" value={form.slug} onChange={handleChange} fullWidth margin="normal" required error={!!errors.slug} helperText={errors.slug} />
            <TextField label="Excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} fullWidth margin="normal" required error={!!errors.excerpt} helperText={errors.excerpt} />
            <TextField label="Content" name="content" value={form.content} onChange={handleChange} fullWidth margin="normal" required multiline rows={4} error={!!errors.content} helperText={errors.content} />
            <TextField
              select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.category}
              helperText={errors.category}
            >
              {allowedCategories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Author Name" name="authorName" value={form.authorName} onChange={handleChange} fullWidth margin="normal" required error={!!errors.authorName} helperText={errors.authorName} />
            <Box mt={2} mb={1}>
              <Button variant="outlined" component="label" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" hidden onChange={handleImage} />
              </Button>
              {form.featuredImage && <Avatar src={form.featuredImage} alt="preview" sx={{ ml: 2, width: 40, height: 40, display: 'inline-flex' }} />}
              {errors.featuredImage && <Typography color="error">{errors.featuredImage}</Typography>}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.published}
                  onChange={handleCheck}
                  name="published"
                />
              }
              label="Published"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">{editing ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default BlogAdmin;