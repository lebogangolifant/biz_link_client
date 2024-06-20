// client/src/components/auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api'; // Use the instance created
import { Container, TextField, Button, Typography, Box } from '@mui/material';
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
      // login logic
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
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        <Box mt={2}>
          <Link to="/forgot-password">
            <Button variant="outlined" color="secondary" fullWidth>Forgot Password?</Button>
          </Link>
        </Box>
        {error && <Typography color="error" align="center">{error}</Typography>}
        {success && <Typography color="primary" align="center">{success}</Typography>}
        <Typography align="center" mt={2}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
