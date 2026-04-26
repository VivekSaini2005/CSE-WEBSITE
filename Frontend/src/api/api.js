import axios from 'axios';
import toast from 'react-hot-toast';

// Get baseURL from env with fallback
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with baseURL
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Log errors and handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Unauthorized: token is invalid or expired
        console.error('Session expired or unauthorized');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        // Forbidden: user doesn't have required permission (admin)
        console.error('Access denied: Admin only');
        toast.error('Access Denied: Admin privileges required');
      }
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
