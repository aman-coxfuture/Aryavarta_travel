import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import PackagesManagement from './pages/PackagesManagement';
import Enquiries from './pages/Enquiries';
import Settings from './pages/Settings';

// 1. Protected Route Component (Security Guard)
// Ye check karega ki token hai ya nahi
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    // Agar token nahi hai, toh login page pe bhej do
    return <Navigate to="/login" replace />;
  }
  
  // Agar token hai, toh andar aane do
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page (Public) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes (Sirf Login ke baad accessible) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Bookings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <PackagesManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/enquiries"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Enquiries />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}