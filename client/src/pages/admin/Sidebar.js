import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar, Button } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
// import PaymentIcon from '@mui/icons-material/Payment';
// import PaymentHistoryIcon from '@mui/icons-material/PaymentHistory';
import { useNavigate, useLocation } from 'react-router-dom';

const menu = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/admin/dashboard' },
  { text: 'Team', icon: <GroupIcon />, path: '/admin/team' },
  { text: 'Blog', icon: <ArticleIcon />, path: '/admin/blog' },
  { text: 'Testimonials', icon: <StarIcon />, path: '/admin/testimonials' },
  { text: 'Projects', icon: <WorkIcon />, path: '/admin/projects' },
  { text: 'Services', icon: <BuildIcon />, path: '/admin/services' },
  { text: 'Contacts', icon: <MailIcon />, path: '/admin/contacts' },
  { text: 'Payment', icon: <PaymentIcon />, path: '/admin/payment' },
  { text: 'Payment History', icon: <HistoryIcon />, path: '/admin/payment-history' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <Drawer 
      variant="permanent" 
      anchor="left" 
      sx={{ 
        width: 220, 
        flexShrink: 0,
        overflowX: 'hidden',
        '& .MuiDrawer-paper': { 
          width: 220, 
          boxSizing: 'border-box', 
          bgcolor: '#222', 
          color: '#fff',
          borderRight: '1px solid #444',
          overflowX: 'hidden'
        } 
      }}
    >
      <Toolbar />
      <List sx={{ mt: 2, overflowX: 'hidden' }}>
        {menu.map(item => (
          <ListItem 
            button 
            key={item.text} 
            selected={location.pathname === item.path} 
            onClick={() => navigate(item.path)}
            sx={{
              mx: 1,
              mb: 0.5,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              overflowX: 'hidden',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(5px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                '& .MuiListItemText-primary': {
                  fontWeight: 600,
                  transform: 'translateX(3px)',
                }
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderLeft: '4px solid #fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }
              },
              '& .MuiListItemIcon-root': {
                transition: 'all 0.3s ease',
              },
              '&:hover .MuiListItemIcon-root': {
                transform: 'scale(1.1)',
                color: '#fff',
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: location.pathname === item.path ? '#fff' : '#ccc',
                minWidth: 40
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{
                overflowX: 'hidden',
                '& .MuiTypography-root': {
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  overflowX: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Button 
        startIcon={<LogoutIcon />} 
        sx={{ 
          m: 2, 
          color: '#fff', 
          borderColor: '#fff',
          transition: 'all 0.3s ease',
          overflowX: 'hidden',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#fff',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
          }
        }} 
        variant="outlined" 
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default Sidebar; 