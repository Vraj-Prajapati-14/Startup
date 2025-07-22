import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Avatar, CircularProgress, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../../utils/api';

const departments = ['leadership', 'development', 'design', 'marketing', 'sales', 'hr', 'operations'];
const emptyMember = { name: '', position: '', department: '', bio: '', shortBio: '', image: '', isActive: true };

const TeamAdmin = () => {
  const [team, setTeam] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyMember);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    const res = await api.get('/api/team?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } });
    setTeam(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleOpen = (member = null) => {
    setEditing(member);
    setForm(member ? { ...member, isActive: member.isActive !== false } : emptyMember);
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditing(null); setForm(emptyMember); };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheck = e => setForm({ ...form, [e.target.name]: e.target.checked });

  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('image', file);
    data.append('type', 'team');

    try {
      const res = await api.post('/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('adminToken') } });
      setForm(f => ({ ...f, image: res.data.url }));
    } catch (err) {
      console.error('Image upload failed:', err);
    }
    setUploading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      name: form.name,
      position: form.position,
      department: form.department,
      bio: form.bio,
      shortBio: form.shortBio,
      image: form.image,
      isActive: form.isActive
    };
    try {
      if (editing) {
        await api.put(`/api/team/${editing._id}`, payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
      } else {
        await api.post('/api/team', payload, { headers: { Authorization: localStorage.getItem('adminToken') } });
      }
      fetchTeam();
      handleClose();
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/api/team/${id}`, { headers: { Authorization: localStorage.getItem('adminToken') } });
      fetchTeam();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Team Members</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Member</Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Available</TableCell>
                <TableCell>Short Bio</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.map(member => (
                <TableRow key={member._id}>
                  <TableCell><Avatar src={member.image} alt={member.name} /></TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      color: member.isActive ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}>
                      {member.isActive ? '✓ Available' : '✗ Unavailable'}
                    </Box>
                  </TableCell>
                  <TableCell>{member.shortBio}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(member)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(member._id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Member' : 'Add Member'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Position" name="position" value={form.position} onChange={handleChange} fullWidth margin="normal" required />
            <TextField select label="Department" name="department" value={form.department} onChange={handleChange} fullWidth margin="normal" required>
              {departments.map(dep => (
                <MenuItem key={dep} value={dep}>{dep.charAt(0).toUpperCase() + dep.slice(1)}</MenuItem>
              ))}
            </TextField>
            <TextField label="Bio" name="bio" value={form.bio} onChange={handleChange} fullWidth margin="normal" required multiline rows={3} />
            <TextField label="Short Bio" name="shortBio" value={form.shortBio} onChange={handleChange} fullWidth margin="normal" required inputProps={{ maxLength: 150 }} />
            <Box mt={2} mb={1}>
              <Button variant="outlined" component="label" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" hidden onChange={handleImage} />
              </Button>
              {form.image && <Avatar src={form.image} alt="preview" sx={{ ml: 2, width: 40, height: 40, display: 'inline-flex' }} />}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.isActive}
                  onChange={handleCheck}
                  name="isActive"
                />
              }
              label="Available"
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

export default TeamAdmin; 