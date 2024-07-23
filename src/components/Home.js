import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, AppBar, Toolbar, FormControl, InputLabel, Select, MenuItem, TextField, Grid } from '@mui/material';
import { useTheme } from './contexts/ThemeContext';
import './styles/App.css';
import api from '../api';

const Home = () => {
  const { theme } = useTheme();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  /*const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let errors = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.companyName) errors.companyName = 'Company Name / Individual is required';
    if (!formData.numberOfCards) errors.numberOfCards = 'Number of Cards is required';
    if (!formData.cardType) errors.cardType = 'Card Type is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Submit form data to backend
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('numberOfCards', formData.numberOfCards);
      formDataToSend.append('cardType', formData.cardType);
      formDataToSend.append('message', formData.message);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      await api.post('/orders', formDataToSend);

      // Show success message or redirect as needed
      alert('Order/Inquire submitted successfully!');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting card order:', error);
      alert('Failed to submit card order. Please try again.');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff', fontFamily: 'Lato, sans-serif' }}>
      <AppBar position="static" sx={{ backgroundColor: '#222' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="../../link-round.svg" alt="Logo" style={{ marginRight: 8, height: 40 }} />
            biz_link
          </Typography>
          <Button component={Link} to="/login" color="inherit">Login</Button>
	  {/*<Button component={Link} to="/register" color="inherit">Register</Button>*/}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Dynamic QR Code VCard Manager
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
          Create a VCard and generate a Dynamic QR code for your NFC card with ease. NFC business cards offer enhanced durability and allow recipients to access your contact information effortlessly, with no need to reprint.
        </Typography>
        <Button 
          href="https://biz-link-server-6f94518ef217.herokuapp.com/api/cards/669a4208b0b355909ebfa727" 
          target="_blank" 
          variant="outlined" 
          color="primary" 
          sx={{ mr: 2 }}>
          Demo
        </Button>
        <Button 
          onClick={() => setShowForm(true)} 
          variant="outlined" 
          color="primary">
          Order Card
        </Button>
        
         {/* Order Form */}
        {showForm && (
          <Box sx={{ p: 2, backgroundColor: isDarkMode ? '#333' : '#fff', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: isDarkMode ? '#fff' : '#000' }}>
              NFC Card Order Form
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
		{/*<Grid item xs={12}>
                  <input type="file" onChange={handleFileChange} />
                </Grid>*/}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowForm(false)}
                    sx={{ marginLeft: 2 }}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}

        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ backgroundColor: '#333', p: 4, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#fff' }}>
                Getting Started ... 
              </Typography>
              <Typography variant="body1" sx={{ color: '#ccc' }}>
                Create a VCard by adding contact information, social media profiles, and more. A Dynamic QR Code is generated simultaneously upon card creation. Download the QR Code.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ backgroundColor: '#333', p: 4, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#fff' }}>
                VCard Features ...
              </Typography>
              <Typography variant="body1" sx={{ color: '#ccc' }}>
                Scan the QR Code to get a link to your responsive VCard online profile, complete with your information and the option to save the VCard information to phone contacts.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ backgroundColor: '#333', p: 4, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#fff' }}>
                Card Management Console ...
              </Typography>
              <Typography variant="body1" sx={{ color: '#ccc' }}>
                Create unlimited user profiles. Edit and update VCard information, with changes reflected immediately. Sort cards into folders, delete cards, and access more features to be added.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
            Start a Free Trial
          </Typography>
          <Button 
            onClick={() => setShowForm(true)} 
            variant="contained" 
            color="primary" 
            size="large" 
            sx={{ mr: 2 }}>
            Order Card
          </Button>

           {/* Order Form */}
        {showForm && (
          <Box sx={{ p: 2, backgroundColor: isDarkMode ? '#333' : '#fff', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: isDarkMode ? '#fff' : '#000' }}>
              NFC Card Order Form
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
		{/*<Grid item xs={12}>
                  <input type="file" onChange={handleFileChange} />
                </Grid>*/}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowForm(false)}
                    sx={{ marginLeft: 2 }}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}

          <Button 
            component={Link} 
            to="/login" 
            variant="outlined" 
            color="primary" 
            size="large">
            Login
          </Button>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Having issues, suggestions and feedback?
          </Typography>
          <Button component="a" href="https://github.com/lebogangolifant/biz_link_server" target="_blank" rel="noopener noreferrer" variant="outlined" color="primary" size="large">Contact Support</Button>
        </Box>

        <Box sx={{ mt: 8, borderTop: '1px solid #ccc', py: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} biz_link. All Rights Reserved. | <a href ="https://github.com/lebogangolifant/biz_link_server" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>View Source Code</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
