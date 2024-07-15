import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const CreateCard = ({ onCreateCard, folders = [], onEditCard, setShowForm, owner }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    x: '',
    instagram: '',
    facebook: '',
    services: '',
    profilePicture: '',
    folderName: '',
    template: 'template1' // default template
  });
  const [folderName, setFolderName] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.company) tempErrors.company = "Company is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    if (!formData.website) tempErrors.website = "Website is required";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      formData.owner = owner;

      // Create the new business card
      await onCreateCard(formData, folderName.trim());

      // Reset form data and folder name
      setFormData({
        name: '',
        title: '',
        company: '',
        email: '',
        phone: '',
        website: '',
        linkedin: '',
        x: '',
        instagram: '',
        facebook: '',
        services: '',
        profilePicture: '',
        folderName: '',
        template: 'template1' // default template
      });
      setFolderName('');
      setShowForm(false);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <Box>
      <TextField label="Folder Name" value={folderName} onChange={(e) => setFolderName(e.target.value)} fullWidth />
      <TextField label="Profile Picture" name="profilePicture" value={formData.profilePicture} onChange={handleChange} fullWidth />
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth error={!!errors.name} helperText={errors.name} required />
      <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth error={!!errors.title} helperText={errors.title} required />
      <TextField label="Company" name="company" value={formData.company} onChange={handleChange} fullWidth error={!!errors.company} helperText={errors.company} required />
      <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth error={!!errors.email} helperText={errors.email} required />
      <TextField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} fullWidth error={!!errors.phone} helperText={errors.phone} required />
      <TextField label="Website" name="website" type="url" value={formData.website} onChange={handleChange} fullWidth error={!!errors.website} helperText={errors.website} required />
      <TextField label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} fullWidth />
      <TextField label="X" name="x" value={formData.x} onChange={handleChange} fullWidth />
      <TextField label="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} fullWidth />
      <TextField label="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} fullWidth />
      <TextField label="Core Services" name="services" value={formData.services} onChange={handleChange} fullWidth multiline rows={4} />
      <TextField
        select
        label="Template"
        name="template"
        value={formData.template}
        onChange={handleChange}
        fullWidth
        required
      >
        <MenuItem value="template1">Template 1</MenuItem>
        <MenuItem value="template2">Template 2</MenuItem>
      </TextField>
      <Button onClick={handleSubmit} variant="contained" color="primary">Create</Button>
    </Box>
  );
};

export default CreateCard;
