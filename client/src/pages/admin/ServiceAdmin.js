import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Avatar, CircularProgress, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../../utils/api';

const categories = ['development', 'design', 'consulting', 'support'];
const emptyService = {
  title: '',
  slug: '',
  description: '',
  shortDescription: '',
  icon: '',
  image: '',
  category: '',
  featured: false,
  isActive: true
};

const ServiceAdmin = () => {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyService);
  const [loading, setLoading] = useState(false);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    const res = await api.get('/api/services?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } });
    setServices(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleOpen = (service = null) => {
    setEditing(service);
    setForm(service ? { ...service, isActive: service.isActive !== false } : emptyService);
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditing(null); setForm(emptyService); };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCheck = e => setForm({ ...form, [e.target.name]: e.target.checked });

  const handleIcon = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingIcon(true);
    const data = new FormData();
    data.append('image', file);
    try {
      const res = await api.post('/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('adminToken') } });
      setForm(f => ({ ...f, icon: res.data.url }));
    } catch (err) {
      console.error('Icon upload failed:', err);
    }
    setUploadingIcon(false);
  };
  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const data = new FormData();
    data.append('image', file);
    data.append('type', 'services');

    try {
      const res = await api.post('/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('adminToken') } });
      setForm(f => ({ ...f, image: res.data.url }));
    } catch (err) {
      console.error('Image upload failed:', err);
    }
    setUploadingImage(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      shortDescription: form.shortDescription,
      icon: form.icon,
      image: form.image,
      category: form.category,
      featured: form.featured,
      isActive: form.isActive
    };
    try {
      if (editing) {
        await api.put(`/api/services/${editing._id}`, payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
      } else {
        await api.post('/api/services', payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
      }
      fetchServices();
      handleClose();
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/api/services/${id}`, { headers: { Authorization: localStorage.getItem('adminToken') } });
      fetchServices();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Services</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Service</Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Icon</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Published</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map(service => (
                <TableRow key={service._id}>
                  <TableCell><Avatar src={service.icon} alt={service.title} /></TableCell>
                  <TableCell>{service.title}</TableCell>
                  <TableCell>{service.slug}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      color: service.isActive ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}>
                      {service.isActive ? '✓ Published' : '✗ Draft'}
                    </Box>
                  </TableCell>
                  <TableCell>{service.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(service)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(service._id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Service' : 'Add Service'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Slug" name="slug" value={form.slug} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" required multiline rows={3} />
            <TextField label="Short Description" name="shortDescription" value={form.shortDescription} onChange={handleChange} fullWidth margin="normal" required inputProps={{ maxLength: 200 }} />
            <TextField select label="Category" name="category" value={form.category} onChange={handleChange} fullWidth margin="normal" required>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
              ))}
            </TextField>
            <FormControlLabel control={<Checkbox checked={form.featured} onChange={handleCheck} name="featured" />} label="Featured" />
            <FormControlLabel control={<Checkbox checked={form.isActive} onChange={handleCheck} name="isActive" />} label="Published" />
            <Box mt={2} mb={1}>
              <Button variant="outlined" component="label" disabled={uploadingIcon}>
                {uploadingIcon ? 'Uploading...' : 'Upload Icon'}
                <input type="file" accept="image/*" hidden onChange={handleIcon} />
              </Button>
              {form.icon && <Avatar src={form.icon} alt="icon" sx={{ ml: 2, width: 40, height: 40, display: 'inline-flex' }} />}
            </Box>
            <Box mt={2} mb={1}>
              <Button variant="outlined" component="label" disabled={uploadingImage}>
                {uploadingImage ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" hidden onChange={handleImage} />
              </Button>
              {form.image && <Avatar src={form.image} alt="image" sx={{ ml: 2, width: 40, height: 40, display: 'inline-flex' }} />}
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

export default ServiceAdmin; 