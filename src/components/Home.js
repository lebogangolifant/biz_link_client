import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  AccountBoxOutlined as AccountBoxIcon,
  CasesOutlined as CasesIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import { useTheme } from './contexts/ThemeContext';
import './styles/App.css';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  // State to manage form visibility and form data
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    numberOfCards: '',
    cardType: '',
    message: '',
    file: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Function to toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    setFormErrors({});
    setFormSubmitted(false);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: null, // Clear validation error on change
    });
  };

  // Function to handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
  };

  // Function to validate form inputs
  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.companyName) {
      errors.companyName = 'Company Name / Individual is required';
    }
    if (!formData.numberOfCards) {
      errors.numberOfCards = 'Number of Cards is required';
    }
    if (!formData.cardType) {
      errors.cardType = 'Card Type is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Simulate sending email (replace with actual submission logic)
      console.log('Form data:', formData);
      // Clear form after submission
      setFormData({
        email: '',
        companyName: '',
        numberOfCards: '',
        cardType: '',
        message: '',
        file: null,
      });
      setFormSubmitted(true);
      // Close the form
      toggleForm();
    }
  };

  return (
    <Box sx={{ backgroundColor: isDarkMode ? '#121212' : '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <IconButton onClick={toggleTheme} sx={{ position: 'absolute', top: 16, right: 16 }}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, color: isDarkMode ? '#fff' : '#000' }}>
          Virtual Business Card Manager
        </Typography>
        <Box my={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ marginRight: 2 }}
          >
            Login
          </Button>
          {/* Order Card Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleForm}
          >
            Order Card
          </Button>
        </Box>

        {/* Explanation Box */}
        <Box my={4} p={2} sx={{ backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#aaa' : '#000', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>
            Why Use NFC Business Cards?
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif' }}>
            NFC (Near Field Communication) technology enables seamless digital interactions with a simple tap. NFC business cards provide enhanced durability and allow recipients to access your contact information effortlessly.
          </Typography>
        </Box>

        {/* Order/Inquire Form */}
        {showForm && (
          <Box sx={{ p: 2, backgroundColor: isDarkMode ? '#333' : '#fff', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: isDarkMode ? '#fff' : '#000' }}>
              Contact Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Name / Individual"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    error={!!formErrors.companyName}
                    helperText={formErrors.companyName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!formErrors.numberOfCards}>
                    <InputLabel>Number of Cards</InputLabel>
                    <Select
                      value={formData.numberOfCards}
                      onChange={handleInputChange}
                      name="numberOfCards"
                    >
                      <MenuItem value="bulk">Bulk</MenuItem>
                      <MenuItem value="individual">Individual</MenuItem>
                    </Select>
                    {formErrors.numberOfCards && <Typography variant="caption" color="error">{formErrors.numberOfCards}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!formErrors.cardType}>
                    <InputLabel>Card Type</InputLabel>
                    <Select
                      value={formData.cardType}
                      onChange={handleInputChange}
                      name="cardType"
                    >
                      <MenuItem value="metal">Metal</MenuItem>
                      <MenuItem value="wood">Wood</MenuItem>
                    </Select>
                    {formErrors.cardType && <Typography variant="caption" color="error">{formErrors.cardType}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input type="file" onChange={handleFileChange} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
            {formSubmitted && (
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Thank you for your submission!
              </Typography>
            )}
          </Box>
        )}

        {/* Feature Cards */}
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
                position: 'relative',
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
                position: 'relative',
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
                position: 'relative',
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
                position: 'relative',
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

