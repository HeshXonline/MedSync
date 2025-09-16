import React from 'react';
import { Navigate } from 'react-router-dom';

// allowedRoles: array of role strings permitted to view this route
const ProtectedRoute = ({ isAuthenticated, userRole, allowedRoles, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/403" replace />;
  }
  return children;
};

export default ProtectedRoute;

