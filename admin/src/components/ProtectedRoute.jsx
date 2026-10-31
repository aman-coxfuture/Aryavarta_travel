import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('adminToken');

  // Agar token nahi hai, toh login page pe bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, toh page dikhao
  return <Outlet />;
};

export default ProtectedRoute;