import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Grid, Avatar } from '@mui/material';
import api from '../../utils/api';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import MailIcon from '@mui/icons-material/Mail';

const DashboardHome = () => {
  const [data, setData] = useState({
    blogs: [],
    projects: [],
    services: [],
    team: [],
    testimonials: [],
    contacts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [
          blogsRes,
          projectsRes,
          servicesRes,
          teamRes,
          testimonialsRes,
          contactsRes,
        ] = await Promise.all([
          api.get('/api/blog?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } }),
          api.get('/api/projects?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } }),
          api.get('/api/services?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } }),
          api.get('/api/team?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } }),
          api.get('/api/testimonials?all=true', { headers: { Authorization: localStorage.getItem('adminToken') } }),
          api.get('/api/contact?limit=1000', { headers: { Authorization: localStorage.getItem('adminToken') } }),
        ]);
        setData({
          blogs: blogsRes.data.posts || blogsRes.data || [],
          projects: projectsRes.data || [],
          services: servicesRes.data || [],
          team: teamRes.data || [],
          testimonials: testimonialsRes.data || [],
          contacts: contactsRes.data.contacts || contactsRes.data || [],
        });
      } catch (err) {
        // Optionally show error
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  // --- Calculate stats ---
  const stats = {
    blogs: {
      total: data.blogs.length,
      published: data.blogs.filter(b => b.published).length,
      drafts: data.blogs.filter(b => !b.published).length,
    },
    projects: {
      total: data.projects.length,
      completed: data.projects.filter(p => p.status === 'completed').length,
      inProgress: data.projects.filter(p => p.status === 'in-progress').length,
      onHold: data.projects.filter(p => p.status === 'on-hold').length,
    },
    services: {
      total: data.services.length,
      active: data.services.filter(s => s.isActive).length,
      featured: data.services.filter(s => s.featured).length,
    },
    team: {
      total: data.team.length,
      available: data.team.filter(m => m.isActive).length,
    },
    testimonials: {
      total: data.testimonials.length,
      published: data.testimonials.filter(t => t.isActive).length,
      featured: data.testimonials.filter(t => t.featured).length,
    },
    contacts: {
      total: data.contacts.length,
      new: data.contacts.filter(c => c.status === 'new').length,
      contacted: data.contacts.filter(c => c.status === 'contacted').length,
      completed: data.contacts.filter(c => c.status === 'completed').length,
    },
  };

  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" mb={3} fontWeight={700}>Admin Dashboard</Typography>
          <Grid container spacing={3}>
            {/* Blogs */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderLeft: '6px solid #1976d2',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: 6,
                  },
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{
                    bgcolor: '#1976d2',
                    mr: 2,
                    width: 48,
                    height: 48,
                    boxShadow: 2,
                  }}>
                    <ArticleIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Blogs</Typography>
                </Box>
                <Typography variant="body1">Total: <b>{stats.blogs.total}</b></Typography>
                <Typography variant="body2" color="text.secondary">Published: <b>{stats.blogs.published}</b></Typography>
                <Typography variant="body2" color="text.secondary">Drafts: <b>{stats.blogs.drafts}</b></Typography>
              </Paper>
            </Grid>
            {/* Projects */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderLeft: '6px solid #388e3c',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: 6,
                  },
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{
                    bgcolor: '#388e3c',
                    mr: 2,
                    width: 48,
                    height: 48,
                    boxShadow: 2,
                  }}>
                    <WorkIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Projects</Typography>
                </Box>
                <Typography variant="body1">Total: <b>{stats.projects.total}</b></Typography>
                <Typography variant="body2" color="text.secondary">Completed: <b>{stats.projects.completed}</b></Typography>
                <Typography variant="body2" color="text.secondary">In Progress: <b>{stats.projects.inProgress}</b></Typography>
                <Typography variant="body2" color="text.secondary">On Hold: <b>{stats.projects.onHold}</b></Typography>
              </Paper>
            </Grid>
            {/* Services */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderLeft: '6px solid #fbc02d',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: 6,
                  },
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{
                    bgcolor: '#fbc02d',
                    mr: 2,
                    width: 48,
                    height: 48,
                    boxShadow: 2,
                  }}>
                    <BuildIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Services</Typography>
                </Box>
                <Typography variant="body1">Total: <b>{stats.services.total}</b></Typography>
                <Typography variant="body2" color="text.secondary">Active: <b>{stats.services.active}</b></Typography>
                <Typography variant="body2" color="text.secondary">Featured: <b>{stats.services.featured}</b></Typography>
              </Paper>
            </Grid>
            {/* Team */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderLeft: '6px solid #7b1fa2',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: 6,
                  },
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{
                    bgcolor: '#7b1fa2',
                    mr: 2,
                    width: 48,
                    height: 48,
                    boxShadow: 2,
                  }}>
                    <GroupIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Team</Typography>
                </Box>
                <Typography variant="body1">Total: <b>{stats.team.total}</b></Typography>
                <Typography variant="body2" color="text.secondary">Available: <b>{stats.team.available}</b></Typography>
              </Paper>
            </Grid>
            {/* Testimonials */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderLeft: '6px solid #ff7043',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: 6,
                  },
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{
                    bgcolor: '#ff7043',
                    mr: 2,
                    width: 48,
                    height: 48,
                    boxShadow: 2,
                  }}>
                    <StarIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Testimonials</Typography>
                </Box>
                <Typography variant="body1">Total: <b>{stats.testimonials.total}</b></Typography>
                <Typography variant="body2" color="text.secondary">Published: <b>{stats.testimonials.published}</b></Typography>
                <Typography variant="body2" color="text.secondary">Featured: <b>{stats.testimonials.featured}</b></Typography>
              </Paper>
            </Grid>
            {/* Contacts */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderLeft: '6px solid #0288d1',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: 6,
                  },
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{
                    bgcolor: '#0288d1',
                    mr: 2,
                    width: 48,
                    height: 48,
                    boxShadow: 2,
                  }}>
                    <MailIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Contacts</Typography>
                </Box>
                <Typography variant="body1">Total: <b>{stats.contacts.total}</b></Typography>
                <Typography variant="body2" color="text.secondary">New: <b>{stats.contacts.new}</b></Typography>
                <Typography variant="body2" color="text.secondary">Contacted: <b>{stats.contacts.contacted}</b></Typography>
                <Typography variant="body2" color="text.secondary">Completed: <b>{stats.contacts.completed}</b></Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default DashboardHome;