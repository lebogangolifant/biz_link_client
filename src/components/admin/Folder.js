import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider, Grid, useTheme } from '@mui/material';
import BusinessCard from './BusinessCard';

const Folder = ({ folder, onEditFolderName, onEditCard, onDeleteCard }) => {
  // Theme hook for consistent styling based on theme mode (dark/light)	
  const theme = useTheme();
  // State for managing folder name editing mode and current folder name
  const [editMode, setEditMode] = useState(false);
  const [folderName, setFolderName] = useState(folder.name);

  // Enable editing mode to allow folder name modification
  const handleEditFolderName = () => {
    setEditMode(true);
  };

   // Save the updated folder name if it's not empty and exit editing mode
   const handleSaveFolderName = () => {
     if (folderName.trim() !== '') {
       onEditFolderName(folder._id, folderName);
     }
     setEditMode(false);
   };

  // Update the folder name state as the user types 
  const handleChange = (e) => {
    setFolderName(e.target.value);
  };

  return (
     <Box
      sx={{
        padding: 2,
        marginBottom: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: theme.palette.mode === 'dark' ? '#000' : '#e0e0e0',
        color: theme.palette.mode === 'dark' ? '#fff' : '#333',
      }}
    >
      {editMode ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            label="Folder Name"
            value={folderName}
            onChange={handleChange}
            size="small"
            fullWidth
            sx={{ marginRight: 1 }}
          />
          <Button
            onClick={handleSaveFolderName}
            variant="contained"
            color="primary"
            size="small"
          >
            Save
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
            {folder.name}
          </Typography>
          {!editMode && (
            <Button
              onClick={handleEditFolderName}
              variant="contained"
              size="small"
              sx={{ marginLeft: 1, fontSize: '0.65rem' }}
            >
              Edit Folder Name
            </Button>
          )}
        </Box>
      )}
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        {folder.cards.map((card, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <BusinessCard
              card={card}
              onEdit={(editedCard) => onEditCard(folder._id, editedCard)}
              onDelete={(cardId) => onDeleteCard(folder._id, cardId)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Folder;
