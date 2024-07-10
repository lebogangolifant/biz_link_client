import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import CardTemplate1 from './components/CardTemplate1';

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
	    <Route path="/cards/:id/template" element={<CardTemplate1Wrapper />} />
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

const CardTemplate1Wrapper = () => {
  const location = useLocation();
  const card = location.state?.card;

  return <CardTemplate1 card={card} />;
};

export default App;
