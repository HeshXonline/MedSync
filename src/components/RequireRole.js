import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireRole = ({ allowedRoles, role, children }) => {
  if (!allowedRoles || allowedRoles.includes(role)) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default RequireRole;

