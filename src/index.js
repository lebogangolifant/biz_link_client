// client/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './components/contexts/ThemeContext';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './AuthContext';

// Get the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
