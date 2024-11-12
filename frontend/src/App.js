// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Handle user login
  const handleLogin = (userToken, userRole) => {
    setToken(userToken);
    setRole(userRole);
    setIsAuthenticated(true);
    localStorage.setItem('token', userToken);
    localStorage.setItem('role', userRole);
  };

  // Handle user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  // Check for existing authentication tokens on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole && !isAuthenticated) {
      setToken(storedToken);
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            {/* Homepage Route */}
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Home />
                ) : (
                  <Navigate to={role === 'admin' ? '/admin' : '/user-home'} />
                )
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to={role === 'admin' ? '/admin' : '/user-home'} />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to={role === 'admin' ? '/admin' : '/user-home'} />
                ) : (
                  <Register />
                )
              }
            />

            {/* Admin Route */}
            {isAuthenticated && role === 'admin' && (
              <Route path="/admin" element={<AdminDashboard token={token} />} />
            )}

            {/* User Route */}
            {isAuthenticated && role === 'user' && (
              <Route path="/user-home" element={<UserHome token={token} />} />
            )}

            {/* Fallback for undefined routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Footer with Logout Button */}
        {isAuthenticated && (
          <footer className="bg-green-700 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
              {/* Footer Text */}
              <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} International Bank. All rights reserved.</p>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </footer>
        )}
      </div>
    </Router>
  );
}

export default App;
