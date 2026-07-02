import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Pause checks while context memory re-hydrates from storage on page refresh
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-gray-900 dark:text-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-2"></div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Syncing User Session...
        </p>
      </div>
    );
  }

  // If no session exists, force browser back to customer sign in portal
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If an admin is trying to access a customer-only route, redirect them to admin dashboard.
  if (user.role === 'admin') {
    const adminRedirectRoutes = [
      '/collections',
      '/product',
      '/message',
      '/user-message',
    ];

    if (adminRedirectRoutes.some((route) => location.pathname.startsWith(route))) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children;
}
