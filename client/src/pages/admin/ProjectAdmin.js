import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Avatar, CircularProgress, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const statuses = ['completed', 'in-progress', 'on-hold'];
const emptyProject = {
  title: '',
  description: '',
  shortDescription: '',
  category: '',
  technologies: [],
  client: '',
  duration: '',
  teamSize: '',
  images: [],
  featuredImage: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  status: 'completed'
};

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    const res = await axios.get('/api/projects?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } });
    setProjects(res.data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/projects/categories/all');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      // Fallback to default categories if API fails
      setCategories(['web-development', 'mobile-development', 'ui-ux-design', 'ecommerce', 'saas', 'fintech', 'healthcare', 'education', 'other']);
    }
  };

  useEffect(() => { 
    fetchProjects(); 
    fetchCategories();
  }, []);

  const handleOpen = (project = null) => {
    setEditing(project);
    setForm(project ? { ...project, teamSize: project.teamSize || '', images: project.images || [] } : emptyProject);
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditing(null); setForm(emptyProject); setNewImage(''); setNewImageAlt(''); };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCheck = e => setForm({ ...form, [e.target.name]: e.target.checked });

  const handleFeaturedImage = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingFeatured(true);
    const data = new FormData();
    data.append('image', file);
    const res = await axios.post('/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('adminToken') } });
    setForm(f => ({ ...f, featuredImage: res.data.url }));
    setUploadingFeatured(false);
  };
  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const data = new FormData();
    data.append('image', file);
    const res = await axios.post('/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('adminToken') } });
    setNewImage(res.data.url);
    setUploadingImage(false);
  };
  const handleAddImage = () => {
    if (newImage) {
      setForm(f => ({ ...f, images: [...(f.images || []), { url: newImage, alt: newImageAlt || 'Project Image' }] }));
      setNewImage('');
      setNewImageAlt('');
    }
  };
  const handleRemoveImage = idx => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      shortDescription: form.shortDescription,
      category: form.category,
      technologies: form.technologies,
      client: form.client,
      duration: form.duration,
      teamSize: form.teamSize,
      images: form.images,
      featuredImage: form.featuredImage,
      liveUrl: form.liveUrl,
      githubUrl: form.githubUrl,
      featured: form.featured,
      status: form.status
    };
    if (editing) {
      await axios.put(`/api/projects/${editing._id}`, payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
    } else {
      await axios.post('/api/projects', payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
    }
    fetchProjects();
    handleClose();
  };

  const handleDelete = async id => {
    await axios.delete(`/api/projects/${id}`, { headers: { Authorization: localStorage.getItem('adminToken') } });
    fetchProjects();
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Projects</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Project</Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Featured Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Published</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map(project => (
                <TableRow key={project._id}>
                  <TableCell><Avatar src={project.featuredImage} alt={project.title} /></TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      color: project.status === 'completed' ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}>
                      {project.status === 'completed' ? '✓ Published' : '✗ Draft'}
                    </Box>
                  </TableCell>
                  <TableCell>{project.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(project)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(project._id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editing ? 'Edit Project' : 'Add Project'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" required multiline rows={3} />
            <TextField label="Short Description" name="shortDescription" value={form.shortDescription} onChange={handleChange} fullWidth margin="normal" required inputProps={{ maxLength: 200 }} />
            <TextField select label="Category" name="category" value={form.category} onChange={handleChange} fullWidth margin="normal" required>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
              ))}
            </TextField>
            <TextField label="Technologies (comma separated)" name="technologies" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value.split(',').map(t => t.trim()) })} fullWidth margin="normal" />
            <TextField label="Client" name="client" value={form.client} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Duration" name="duration" value={form.duration} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Team Size" name="teamSize" value={form.teamSize} onChange={handleChange} fullWidth margin="normal" type="number" />
            <TextField label="Live URL" name="liveUrl" value={form.liveUrl} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="GitHub URL" name="githubUrl" value={form.githubUrl} onChange={handleChange} fullWidth margin="normal" />
            <FormControlLabel control={<Checkbox checked={form.featured} onChange={handleCheck} name="featured" />} label="Featured" />
            <TextField select label="Status" name="status" value={form.status} onChange={handleChange} fullWidth margin="normal" required>
              {statuses.map(s => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)}
            </TextField>
            <Box mt={2} mb={1}>
              <Button variant="outlined" component="label" disabled={uploadingFeatured}>
                {uploadingFeatured ? 'Uploading...' : 'Upload Featured Image'}
                <input type="file" accept="image/*" hidden onChange={handleFeaturedImage} />
              </Button>
              {form.featuredImage && <Avatar src={form.featuredImage} alt="featured" sx={{ ml: 2, width: 40, height: 40, display: 'inline-flex' }} />}
            </Box>
            <Box mt={2} mb={1}>
              <Typography variant="subtitle1">Project Images</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Button variant="outlined" component="label" disabled={uploadingImage}>
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  <input type="file" accept="image/*" hidden onChange={handleImage} />
                </Button>
                <TextField label="Alt Text" value={newImageAlt} onChange={e => setNewImageAlt(e.target.value)} size="small" />
                <Button variant="contained" onClick={handleAddImage} disabled={!newImage}>Add</Button>
              </Box>
              <Box mt={1} display="flex" gap={2} flexWrap="wrap">
                {form.images && form.images.map((img, idx) => (
                  <Box key={idx} display="flex" alignItems="center" gap={1}>
                    <Avatar src={img.url} alt={img.alt} sx={{ width: 40, height: 40 }} />
                    <Typography variant="body2">{img.alt}</Typography>
                    <Button size="small" color="error" onClick={() => handleRemoveImage(idx)}>Remove</Button>
                  </Box>
                ))}
              </Box>
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

export default ProjectAdmin; 