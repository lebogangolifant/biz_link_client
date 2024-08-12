import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component provides authentication state and functions to its children.
export const AuthProvider = ({ children }) => {
  // State to hold the current user. Initially, it is set to null.
  const [user, setUser] = useState(null);

  // Function to simulate user login and update the user state.
  const login = (userData) => {
    setUser(userData); // Set the user state with the provided userData
  };

  // Provide the user state and login function to the rest of the app.
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context values.
export const useAuth = () => useContext(AuthContext);
