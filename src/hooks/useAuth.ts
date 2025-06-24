import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { setUser, setInitialized, signUp, signIn, signInWithGoogle, signOut, resetPassword } from '../store/slices/authSlice';
import { AuthService } from '../services/authService';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error, isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      dispatch(setUser(user));
      if (!isInitialized) {
        dispatch(setInitialized(true));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, isInitialized]);

  // Auth actions
  const handleSignUp = (email: string, password: string, displayName?: string) => {
    return dispatch(signUp({ email, password, displayName }));
  };

  const handleSignIn = (email: string, password: string) => {
    return dispatch(signIn({ email, password }));
  };

  const handleGoogleSignIn = () => {
    return dispatch(signInWithGoogle());
  };

  const handleSignOut = () => {
    return dispatch(signOut());
  };

  const handleResetPassword = (email: string) => {
    return dispatch(resetPassword(email));
  };

  return {
    // State
    user,
    isLoading,
    error,
    isAuthenticated,
    isInitialized,
    
    // Actions
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInWithGoogle: handleGoogleSignIn,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
  };
}; 