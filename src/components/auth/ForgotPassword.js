import React, { useState } from 'react';
import axios from '../../api'; // Import your axios instance
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
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
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Reset Instructions
        </Button>
        {error && <Typography color="error" align="center" marginTop={2}>{error}</Typography>}
        {success && <Typography color="primary" align="center" marginTop={2}>{success}</Typography>}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
