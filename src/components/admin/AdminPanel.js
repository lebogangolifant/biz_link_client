import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Divider, TextField, IconButton, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CreateCard from './CreateCard';
import Folder from './Folder';
import Sidebar from './Sidebar';
import api from '../../api'; // Import the custom axios instance for API calls
import { useAuth } from '../../AuthContext';

// AdminPanel component to manage folders and business cards
const AdminPanel = () => {
  // Auth context to get the current user
  const { user } = useAuth();

  // State hooks for managing form visibility, folders data, search query, and sidebar state
  const [showForm, setShowForm] = useState(false);
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch folders data from the server when the component mounts
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await api.get('/folders');
        const fetchedFolders = response.data.map(folder => ({
          ...folder,
          cards: folder.cards || []  // Ensure cards array exists
        }));
        setFolders(fetchedFolders);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []); // Empty dependency array ensures this runs only once

  // Toggle the visibility of the create card form
  const handleToggleForm = () => {
    setShowForm(prevState => !prevState);
  };
 
  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle creating a new card within a folder
  const handleCreateCard = async (formData, folderName) => {
    try {
      // Check if the folder exists; if not, create it
      let existingFolder = folders.find(folder => folder.name === folderName);
      if (!existingFolder) {
        const folderResponse = await api.post('/folders', { name: folderName });
        existingFolder = folderResponse.data;
        setFolders(prevFolders => [...prevFolders, existingFolder]);
      }

      // Add the new card to the folder
      const response = await api.post(`/folders/${existingFolder._id}/cards`, formData);
      const newCard = response.data;

      setFolders(prevFolders => {
        return prevFolders.map(folder => {
          if (folder._id === existingFolder._id) {
            return {
              ...folder,
              cards: [...folder.cards, newCard]
            };
          }
          return folder;
        });
      });

      setShowForm(false);
    } catch (error) {
      console.error('Error creating card:', error);
      // Log detailed error information for debugging
      if (error.response) {
        console.log('Response Data:', error.response.data);
        console.log('Response Status:', error.response.status);
        console.log('Response Headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request Data:', error.request);
      } else {
        console.log('Error Message:', error.message);
      }
    }
  };

  // Handle editing the folder name
  const handleEditFolderName = async (folderId, newFolderName) => {
    try {
      const response = await api.put(`/folders/${folderId}`, { name: newFolderName });
      const updatedFolder = response.data;
      setFolders(prevFolders =>
        prevFolders.map(folder => (folder._id === folderId ? updatedFolder : folder))
      );
    } catch (error) {
      console.error('Error updating folder name:', error);
    }
  };

  // Handle editing a card within a folder
  const handleEditCard = async (folderId, editedCard) => {
    try {
      await api.put(`/cards/${editedCard._id}`, editedCard);
      setFolders(prevFolders => {
        return prevFolders.map(folder => {
          if (folder._id === folderId) {
            return {
              ...folder,
              cards: folder.cards.map(card => (card._id === editedCard._id ? editedCard : card))
            };
          }
          return folder;
        });
      });
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  // Handle deleting a card from a folder
  const handleDeleteCard = async (folderId, deletedCardId) => {
    try {
      await api.delete(`/cards/${deletedCardId}`);
      setFolders(prevFolders => {
        return prevFolders.map(folder => {
          if (folder._id === folderId) {
            return {
              ...folder,
              cards: folder.cards.filter(card => card._id !== deletedCardId)
            };
          }
          return folder;
        });
      });
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  // Filter folders based on the search query
  const filteredFolders = folders.map(folder => ({
    ...folder,
    cards: folder.cards.filter(card =>
      (card.name ? card.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
      (card.company ? card.company.toLowerCase().includes(searchQuery.toLowerCase()) : false)
    )
  }));

  // Determine which folders to display based on search query
  const foldersToDisplay = searchQuery ? filteredFolders : folders;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={{ flexGrow: 1, marginLeft: sidebarOpen ? 240 : 0, transition: 'margin-left 0.3s' }}>
        <Box display="flex" alignItems="center" p={2}>
          <IconButton onClick={toggleSidebar} sx={{ marginRight: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
        </Box>
        <Divider />
        <Box my={2} p={2}>
          <Button onClick={handleToggleForm} variant="contained" color="primary">
            {showForm ? 'Close Form' : 'Create New Card'}
          </Button>
          {showForm && (
            <CreateCard
              onCreateCard={handleCreateCard}
              folders={folders}
              setShowForm={setShowForm}
              owner={user ? user.id : null}
            />
           )}
        </Box>
        <Box my={2} p={2}>
          <TextField
            label="Search by Name or Company"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '50px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                  },
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-input': {
                padding: '10px 16px',
              },
              '& .MuiInputLabel-outlined': {
                transform: 'translate(14px, 12px) scale(1)',
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(14px, -6px) scale(0.75)',
              },
            }}
          />
        </Box>
        <Box p={2}>
          {foldersToDisplay.map(folder => (
            <Folder
              key={folder._id}
              folder={folder}
              onEditFolderName={handleEditFolderName}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </Box>
      </div>
    </div>
  );
};

export default AdminPanel;
