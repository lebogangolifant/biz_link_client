// client/src/components/auth/Register.js
import React, { useState } from 'react';
import axios from '../../api'; // Use the instance created'../../api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/auth/register', values);
        setSuccess(`Registration successful for ${response.data.name}! Redirecting to login page...`);
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        setError('Registration failed. Please try again.');
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...formik.getFieldProps('name')}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          {...formik.getFieldProps('confirmPassword')}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
        {error && <Typography color="error" align="center">{error}</Typography>}
        {success && <Typography color="primary" align="center">{success}</Typography>}
      </Box>
    </Container>
  );
};

export default Register;
