import React, { useState } from 'react';
import axios from '../../api'; // Import your axios instance
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, Divider } from '@mui/material';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('/auth/reset-password-request', { email: values.email });
        setSuccess('Password reset instructions sent to your email.');
        setError('');
      } catch (error) {
        setError('Failed to send reset instructions. Please try again.');
        setSuccess('');
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#121212', color: '#fff', fontFamily: 'Lato, sans-serif' }}>
      <AppBar position="static" sx={{ backgroundColor: '#222' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="../../link-round.svg" alt="Logo" style={{ marginRight: 8, height: 40 }} />
            biz_link
          </Typography>
          <Button component={Link} to="/" color="inherit">Back to Home</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs" sx={{ flexGrow: 1, mt: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Send Reset Instructions
          </Button>
          {error && <Typography color="error" align="center" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="primary" align="center" sx={{ mt: 2 }}>{success}</Typography>}
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

export default ForgotPassword;
