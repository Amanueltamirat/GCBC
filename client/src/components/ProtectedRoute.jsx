import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * <ProtectedRoute role="member">...</ProtectedRoute>  — signed-in member or admin
 * <ProtectedRoute role="admin">...</ProtectedRoute>   — admin only
 */
export default function ProtectedRoute({ role = 'member', children }) {
  const { isMember, isAdmin } = useAuth();
  const location = useLocation();

  const allowed = role === 'admin' ? isAdmin : isMember;

  if (!allowed) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
}
