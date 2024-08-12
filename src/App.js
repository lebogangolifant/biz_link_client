import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useTheme } from './components/contexts/ThemeContext';
import './components/styles/App.css';
import Home from './components/Home';
import AdminPanel from './components/admin/AdminPanel';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import CardDetails from './components/CardDetails';
import CardTemplate1 from './components/admin/CardTemplate1';

function App() {
  // Retrieve the current theme from the ThemeContext	
  const { theme } = useTheme();
  // Create a Material-UI theme based on the current theme mode (light or dark)
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
      // Apply the theme to the entire application		   
      <ThemeProvider theme={muiTheme}>
        {/* Apply global CSS baseline for consistent styling */}
        <CssBaseline />
	{/* Set up the Router to handle navigation within the application */}
        <Router>
          <Routes>
	    {/* Define routes and their corresponding components */}
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
	    <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
	    <Route path="/cards/:id" element={<CardDetails />} />
	    <Route path="/cards/:id" element={<CardTemplate1 />} />
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;
