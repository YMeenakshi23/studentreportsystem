// in src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();

  // Check if the user's role is in the list of allowed roles
  const isAllowed = allowedRoles.includes(userRole);

  return isAllowed ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;