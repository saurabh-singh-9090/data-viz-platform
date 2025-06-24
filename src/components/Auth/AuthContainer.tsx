import React, { useState, lazy, Suspense } from 'react';

type AuthMode = 'login' | 'signup' | 'forgot-password';

// Lazy load auth form components
const LoginForm = lazy(() => import('./LoginForm'));
const SignUpForm = lazy(() => import('./SignUpForm'));
const ForgotPasswordForm = lazy(() => import('./ForgotPasswordForm'));

// Loading spinner for auth forms
const AuthFormLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0E0D0D]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9FF3B]"></div>
  </div>
);

const AuthContainer: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  const switchToLogin = () => setMode('login');
  const switchToSignUp = () => setMode('signup');
  const switchToForgotPassword = () => setMode('forgot-password');

  const renderAuthForm = () => {
    switch (mode) {
      case 'signup':
        return (
          <Suspense fallback={<AuthFormLoader />}>
            <SignUpForm onSwitchToLogin={switchToLogin} />
          </Suspense>
        );
      case 'forgot-password':
        return (
          <Suspense fallback={<AuthFormLoader />}>
            <ForgotPasswordForm onSwitchToLogin={switchToLogin} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<AuthFormLoader />}>
            <LoginForm
              onSwitchToSignUp={switchToSignUp}
              onForgotPassword={switchToForgotPassword}
            />
          </Suspense>
        );
    }
  };

  return renderAuthForm();
};

export default React.memo(AuthContainer); 