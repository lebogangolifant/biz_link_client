import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import {
  AccountBoxOutlined as AccountBoxIcon,
  CasesOutlined as CasesIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';
import { useTheme } from './contexts/ThemeContext';
import './styles/App.css';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Box sx={{ backgroundColor: isDarkMode ? '#121212' : '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <IconButton onClick={toggleTheme} sx={{ position: 'absolute', top: 16, right: 16 }}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, color: isDarkMode ? '#fff' : '#000' }}>
          Virtual Business Card Manager
        </Typography>
        <Box my={4}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ marginRight: 2 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="secondary"
          >
            Register
          </Button>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'left',
                borderRadius: 2,
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                backgroundColor: isDarkMode ? '#333' : '#fff',
                position: 'relative'
              }}
            >
              <AccountBoxIcon color="primary" sx={{ fontSize: 24, position: 'absolute', top: 8, left: 8 }} />
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: isDarkMode ? '#fff' : '#000' }}>
                  User Management
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: isDarkMode ? '#aaa' : '#000' }}>
                  Manage user accounts and profiles.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'left',
                borderRadius: 2,
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                backgroundColor: isDarkMode ? '#333' : '#fff',
                position: 'relative'
              }}
            >
              <CasesIcon color="primary" sx={{ fontSize: 24, position: 'absolute', top: 8, left: 8 }} />
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: isDarkMode ? '#fff' : '#000' }}>
                  Business Cards
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: isDarkMode ? '#aaa' : '#000' }}>
                  Create and manage business cards.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'left',
                borderRadius: 2,
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                backgroundColor: isDarkMode ? '#333' : '#fff',
                position: 'relative'
              }}
            >
              <EditIcon color="primary" sx={{ fontSize: 24, position: 'absolute', top: 8, left: 8 }} />
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: isDarkMode ? '#fff' : '#000' }}>
                  Edit Cards
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: isDarkMode ? '#aaa' : '#000' }}>
                  Edit your business card details.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'left',
                borderRadius: 2,
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                backgroundColor: isDarkMode ? '#333' : '#fff',
                position: 'relative'
              }}
            >
              <DeleteIcon color="primary" sx={{ fontSize: 24, position: 'absolute', top: 8, left: 8 }} />
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: isDarkMode ? '#fff' : '#000' }}>
                  Delete Cards
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: isDarkMode ? '#aaa' : '#000' }}>
                  Remove business cards easily.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

