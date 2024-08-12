import React, { useState } from 'react';
import { Card, CardContent, Typography, Divider, Button, Modal, TextField, Box,  MenuItem, useTheme, } from '@mui/material';
import CardTemplate1 from './CardTemplate1';
import CardTemplate2 from './CardTemplate2';

const BusinessCard = ({ card, onEdit, onDelete }) => {
  // Theme hook for theming
  const theme = useTheme();

  // State to manage modal visibility and edited card data
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({ ...card });
  const [showContent, setShowContent] = useState(true);

  // Toggle the visibility of the card content
  const toggleContent = () => {
    setShowContent(prevState => !prevState);
  };

  // Open the edit modal and set the current card data for editing
  const handleEditOpen = () => {
    setEditedData({ ...card });
    setEditOpen(true);
  };

  // Close the edit modal
  const handleEditClose = () => {
    setEditOpen(false);
  };

  // Save the edited data and close the modal
  const handleEditSave = () => {
    onEdit(editedData);
    setEditOpen(false);
  };

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Render the appropriate template based on the card's template type
  const renderTemplate = () => {
    switch (card.template) {
      case 'template1':
        return <CardTemplate1 card={card} />;
      case 'template2':
        return <CardTemplate2 card={card} />;
      default:
        return <CardTemplate1 card={card} />;

    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        margin: 2,
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff',
      }}
    >
      <CardContent>
        {showContent && renderTemplate()}
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', padding: '2px', m: -1, gap: 2, height: '2px' }}>
          <Button
            onClick={handleEditOpen}
            variant="contained"
            size="small"
            sx={{
              minWidth: '70px',
              fontSize: '0.65rem',
              padding: '2px 4px',
              lineHeight: '1.2',
              height: '30px',
            }}
          >
            Edit
          </Button>
          <Button
            onClick={toggleContent}
            variant="contained"
            size="small"
            sx={{
              minWidth: '70px',
              fontSize: '0.65rem',
              padding: '2px 4px',
              lineHeight: '1.2',
              height: '30px',
            }}
          >
            {showContent ? 'Hide' : 'Show'}
          </Button>
          <Button
            onClick={() => onDelete(card._id)}
            variant="contained"
            size="small"
            color="secondary"
            sx={{
              minWidth: '70px',
              fontSize: '0.65rem',
              padding: '2px 4px',
              lineHeight: '1.2',
              height: '30px',
            }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
      {/* Edit Modal */}
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="edit-card-modal-title"
        aria-describedby="edit-card-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            overflowY: 'auto',
            maxHeight: '80vh',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" id="edit-card-modal-title">Edit Business Card</Typography>
          <Divider sx={{ my: 1 }} />
          <TextField label="Profile Picture" name="profilePicture" value={editedData.profilePicture} onChange={handleChange} fullWidth required margin="dense" autocomplete="off" />
          <TextField label="Name" name="name" value={editedData.name} onChange={handleChange} fullWidth required margin="dense" autocomplete="name"/>
          <TextField label="Title" name="title" value={editedData.title} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Company" name="company" value={editedData.company} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Email" name="email" value={editedData.email} onChange={handleChange} fullWidth required margin="dense" />
	  <TextField label="Phone" name="phone" value={editedData.phone} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Website" name="website" value={editedData.website} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Linkedin" name="linkedin" value={editedData.linkedin} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Github" name="github" value={editedData.github} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Telegram" name="telegram" value={editedData.telegram} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="X" name="x" value={editedData.x} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Instagram" name="instagram" value={editedData.instagram} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Facebook" name="facebook" value={editedData.facebook} onChange={handleChange} fullWidth required margin="dense" />
          <TextField label="Core Services" name="services" value={editedData.services} onChange={handleChange} fullWidth required margin="dense" />
          <TextField
            select
            label="Template"
            name="template"
            value={editedData.template}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          >
            <MenuItem value="template1">Template 1</MenuItem>
            <MenuItem value="template2">Dont Use</MenuItem>
          </TextField>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
            <Button onClick={handleEditClose} variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default BusinessCard;
