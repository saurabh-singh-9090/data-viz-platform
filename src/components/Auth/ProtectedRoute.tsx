import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthContainer from './AuthContainer';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0E0D0D]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9FF3B] mx-auto"></div>
      <p className="mt-4 text-white">Loading...</p>
    </div>
  </div>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized, isLoading } = useAuth();

  // Show loading screen while initializing or during auth operations
  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated) {
    return <AuthContainer />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 