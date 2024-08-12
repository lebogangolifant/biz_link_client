import axios from 'axios';

// Define the base URL for API requests.This can be set via environment variables
// or defaults to 'http://localhost:5000/api' for local development.
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create an instance of axios with the specified base URL. This instance will
// be used to make HTTP requests to the backend API.
const api = axios.create({
  baseURL: baseURL,
});

// Log the API base URL to the console for debugging purposes.
console.log('API Base URL:', baseURL);

// Set up an interceptor for all outgoing requests. This interceptor:
// - Retrieves the JWT token from local storage.
// - Adds the token to the `Authorization` header of the request if it exists.
// - Handles any request errors by rejecting the promise.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
