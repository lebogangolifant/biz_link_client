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

function App() {	
  const { theme } = useTheme();
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
	    <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
	    <Route path="/cards/:id" element={<CardDetails />} />
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;
