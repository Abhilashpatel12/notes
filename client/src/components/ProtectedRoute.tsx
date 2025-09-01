import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token is found, redirect to the sign-in page
    return <Navigate to="/signin" replace />;
  }

  // If a token exists, render the child component (e.g., the Dashboard)
  return <>{children}</>;
};

export default ProtectedRoute;
