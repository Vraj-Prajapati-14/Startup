import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const AdminDashboard = () => (
  <Box display="flex" minHeight="100vh" bgcolor="#f5f6fa">
    <Sidebar />
    <Box flex={1} p={3}>
      <Outlet />
    </Box>
  </Box>
);

export default AdminDashboard;