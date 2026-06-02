import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;