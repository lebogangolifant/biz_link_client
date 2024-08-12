import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, Divider, Box } from '@mui/material';
import { Home, WorkOutline, ChevronLeft as ChevronLeftIcon, Brightness4, Brightness7, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = ({ open, toggleSidebar }) => {
  // Access theme and toggleTheme function from ThemeContext	
  const { theme, toggleTheme } = useTheme();
  // Hook for navigation
  const navigate = useNavigate();

  // Handle user logout by clearing the token and redirecting to home page
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: theme === 'light' ? '#fff' : '#333',
          color: theme === 'light' ? '#000' : '#fff',
          width: 240,
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1}>
        <IconButton onClick={toggleSidebar} sx={{ color: theme === 'light' ? '#000' : '#fff' }}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: theme === 'light' ? '#000' : '#fff' }}><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/admin">
          <ListItemIcon sx={{ color: theme === 'light' ? '#000' : '#fff' }}><WorkOutline /></ListItemIcon>
          <ListItemText primary="Admin Panel" />
        </ListItem>
        <ListItem button onClick={toggleTheme}>
          <ListItemIcon sx={{ color: theme === 'light' ? '#000' : '#fff' }}>
            {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          </ListItemIcon>
          <ListItemText primary={null} />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: theme === 'light' ? '#000' : '#fff' }}><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
