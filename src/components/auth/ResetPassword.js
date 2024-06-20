import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../api'; // Import your axios instance
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

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

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
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
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Reset Password</Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          required
          {...formik.getFieldProps('newPassword')}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
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
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Reset Password
        </Button>
        {error && <Typography color="error" align="center" marginTop={2}>{error}</Typography>}
        {success && <Typography color="primary" align="center" marginTop={2}>{success}</Typography>}
      </Box>
    </Container>
  );
};

export default ResetPassword;
