import React, { createContext, useContext, useState } from 'react';

// Create a Context object for theme management
const ThemeContext = createContext();

// Custom hook to use the ThemeContext more easily
export const useTheme = () => useContext(ThemeContext);

// Provider component to wrap around parts of the app that need theme context
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme, defaulting to 'light'	
  const [theme, setTheme] = useState('light');

  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the current theme and the toggle function to child components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

