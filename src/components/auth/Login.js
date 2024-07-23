// client/src/components/auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api'; // Use the instance created
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

const Login = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/auth/login', values);
        localStorage.setItem('token', response.data.token);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/admin');
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        setError('Login failed. Please check your credentials.');
      }
    },
  });

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff', fontFamily: 'Open Sans, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ backgroundColor: '#222' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="../../link-round.svg" alt="Logo" style={{ marginRight: 8, height: 40 }} />
            biz_link
          </Typography>
          <Button component={Link} to="/" color="inherit">Back to Home</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs" sx={{ mt: 8, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{ sx: { color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#ccc' } }}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#ccc',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196f3',
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{ sx: { color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#ccc' } }}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#ccc',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196f3',
                },
              },
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="secondary">
                Forgot Password?
              </Button>
            </Link>
          </Box>
          {error && <Typography color="error" align="center" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="primary" align="center" sx={{ mt: 2 }}>{success}</Typography>}
	  {/*<Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>*/}
        </Box>
      </Container>
      <Box sx={{ mt: 'auto', py: 2, textAlign: 'center' }}>
        <Divider sx={{ borderColor: '#ccc', width: '50%', mx: 'auto', mb: 2 }} />
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} biz_link. All Rights Reserved. | <a href="https://github.com/lebogangolifant/biz_link_server" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>View Source Code</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
