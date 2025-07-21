import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Avatar, CircularProgress, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const emptyTestimonial = {
  clientName: '',
  clientPosition: '',
  clientCompany: '',
  clientImage: '',
  content: '',
  rating: 5,
  service: '',
  featured: false,
  verified: false,
  isActive: true
};

const TestimonialAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    const res = await axios.get('/api/testimonials?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } });
    setTestimonials(res.data);
    setLoading(false);
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get('/api/services');
      setServices(res.data);
    } catch (err) {
      console.error('Failed to fetch services:', err);
      // Fallback to default services if API fails
      setServices([
        { slug: 'web-development', title: 'Web Development' },
        { slug: 'mobile-development', title: 'Mobile Development' },
        { slug: 'ui-ux-design', title: 'UI/UX Design' },
        { slug: 'devops', title: 'DevOps' },
        { slug: 'consulting', title: 'Consulting' },
        { slug: 'digital-transformation', title: 'Digital Transformation' }
      ]);
    }
  };

  useEffect(() => { 
    fetchTestimonials(); 
    fetchServices();
  }, []);

  const handleOpen = (testimonial = null) => {
    setEditing(testimonial);
    setForm(testimonial ? { ...testimonial, isActive: testimonial.isActive !== false } : emptyTestimonial);
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditing(null); setForm(emptyTestimonial); };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCheck = e => setForm({ ...form, [e.target.name]: e.target.checked });

  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('image', file);
    try {
      const res = await axios.post('/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('adminToken') } });
      setForm(f => ({ ...f, clientImage: res.data.url }));
    } catch (err) {
      console.error('Image upload failed:', err);
    }
    setUploading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      clientName: form.clientName,
      clientPosition: form.clientPosition,
      clientCompany: form.clientCompany,
      clientImage: form.clientImage,
      content: form.content,
      rating: Number(form.rating),
      service: form.service,
      featured: form.featured,
      verified: form.verified,
      isActive: form.isActive
    };
    try {
      if (editing) {
        await axios.put(`/api/testimonials/${editing._id}`, payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
      } else {
        await axios.post('/api/testimonials', payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
      }
      fetchTestimonials();
      handleClose();
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/testimonials/${id}`, { headers: { Authorization: localStorage.getItem('adminToken') } });
      fetchTestimonials();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Testimonials</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Testimonial</Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Published</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonials.map(testimonial => (
                <TableRow key={testimonial._id}>
                  <TableCell><Avatar src={testimonial.clientImage} alt={testimonial.clientName} /></TableCell>
                  <TableCell>{testimonial.clientName}</TableCell>
                  <TableCell>{testimonial.clientPosition}</TableCell>
                  <TableCell>{testimonial.clientCompany}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      color: testimonial.isActive ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}>
                      {testimonial.isActive ? '✓ Published' : '✗ Draft'}
                    </Box>
                  </TableCell>
                  <TableCell>{testimonial.content.slice(0, 60)}...</TableCell>
                  <TableCell>{testimonial.rating}</TableCell>
                  <TableCell>{testimonial.service}</TableCell>
                  <TableCell>{testimonial.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{testimonial.verified ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(testimonial)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(testimonial._id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField label="Name" name="clientName" value={form.clientName} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Position" name="clientPosition" value={form.clientPosition} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Company" name="clientCompany" value={form.clientCompany} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Content" name="content" value={form.content} onChange={handleChange} fullWidth margin="normal" required multiline rows={3} />
            <TextField label="Rating" name="rating" value={form.rating} onChange={handleChange} fullWidth margin="normal" required type="number" inputProps={{ min: 1, max: 5 }} />
            <TextField select label="Service" name="service" value={form.service} onChange={handleChange} fullWidth margin="normal">
              <MenuItem value="">None</MenuItem>
              {services.map(s => <MenuItem key={s.slug} value={s.slug}>{s.title}</MenuItem>)}
            </TextField>
            <FormControlLabel control={<Checkbox checked={form.featured} onChange={handleCheck} name="featured" />} label="Featured" />
            <FormControlLabel control={<Checkbox checked={form.verified} onChange={handleCheck} name="verified" />} label="Verified" />
            <FormControlLabel control={<Checkbox checked={form.isActive} onChange={handleCheck} name="isActive" />} label="Published" />
            <Box mt={2} mb={1}>
              <Button variant="outlined" component="label" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" hidden onChange={handleImage} />
              </Button>
              {form.clientImage && <Avatar src={form.clientImage} alt="preview" sx={{ ml: 2, width: 40, height: 40, display: 'inline-flex' }} />}
            </Box>
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

export default TestimonialAdmin;