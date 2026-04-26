import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginUser, registerUser } from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const isAuthenticated = !!token;

  // On app load, check for token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        try {
          const decoded = jwtDecode(storedToken);
          setUser(decoded.user || decoded);
        } catch {
          setUser(null);
        }
      }
      setIsAdmin(storedIsAdmin === 'true');
    }
  }, []);

  // Login function
  const login = async (data) => {
    const res = await loginUser(data);
    // Backend returns data in a 'data' field (ApiResponse structure)
    const authData = res?.data || res; 
    
    if (authData && authData.token) {
      localStorage.setItem('token', authData.token);
      setToken(authData.token);
      
      let userObj = null;
      let adminFlag = false;
      
      if (authData.user) {
        userObj = authData.user;
        adminFlag = !!authData.user.isAdmin;
      } else {
        try {
          const decoded = jwtDecode(authData.token);
          userObj = decoded.user || decoded;
          adminFlag = !!decoded.isAdmin;
        } catch {
          userObj = null;
          adminFlag = false;
        }
      }
      
      setUser(userObj);
      setIsAdmin(adminFlag);
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('isAdmin', adminFlag.toString());
    }
    return res;
  };

  // Register function
  const register = async (data) => {
    return registerUser(data);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
