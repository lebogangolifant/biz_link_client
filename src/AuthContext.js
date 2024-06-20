// client/src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap around the parts of your app that need access to authentication
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state as null

  // Function to simulate login and set user data (replace with actual login logic)
  const login = (userData) => {
    setUser(userData); // In a real application, fetch and set user data from an API
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
