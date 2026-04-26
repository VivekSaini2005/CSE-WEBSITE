import api from './api';

// Register a new user
export async function registerUser(data) {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
}

// Login user
export async function loginUser(data) {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
}

// Centralized error handler
function handleAuthError(error) {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error(error.message || 'Authentication error');
}
