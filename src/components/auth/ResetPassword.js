import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../api'; // Import the custom axios instance for making API requests
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Define validation schema for the reset password form using yup
const validationSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('New Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Send POST request to the password reset endpoint with the token and new password
        await axios.post('/auth/reset-password', { token, newPassword: values.newPassword });
        setSuccess('Password has been reset successfully.');
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setError('Failed to reset password. Please try again.');
        setSuccess('');
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#121212', color: '#fff', fontFamily: 'Lato, sans-serif' }}>
      {/* AppBar for header */}
      <AppBar position="static" sx={{ backgroundColor: '#222' }}>
        <Toolbar>
	  {/* Logo and title in the AppBar */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="../../link-round.svg" alt="Logo" style={{ marginRight: 8, height: 40 }} />
            biz_link
          </Typography>
          <Button component={Link} to="/" color="inherit">Back to Home</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs" sx={{ flexGrow: 1, mt: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Reset Password
        </Typography>
	{/* Reset password form */}
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            required
            {...formik.getFieldProps('newPassword')}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
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
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            required
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
            Reset Password
          </Button>
          {error && <Typography color="error" align="center" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="primary" align="center" sx={{ mt: 2 }}>{success}</Typography>}
        </Box>
      </Container>
      {/* Footer section */}
      <Box sx={{ mt: 'auto', py: 2, textAlign: 'center' }}>
        <Divider sx={{ borderColor: '#ccc', width: '50%', mx: 'auto', mb: 2 }} />
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} biz_link. All Rights Reserved. | <a href="https://github.com/lebogangolifant/biz_link_server" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>View Source Code</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;
