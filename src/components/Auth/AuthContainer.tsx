import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';

type AuthMode = 'login' | 'signup' | 'forgot-password';

const AuthContainer: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  const switchToLogin = () => setMode('login');
  const switchToSignUp = () => setMode('signup');
  const switchToForgotPassword = () => setMode('forgot-password');

  switch (mode) {
    case 'signup':
      return <SignUpForm onSwitchToLogin={switchToLogin} />;
    case 'forgot-password':
      return <ForgotPasswordForm onSwitchToLogin={switchToLogin} />;
    default:
      return (
        <LoginForm
          onSwitchToSignUp={switchToSignUp}
          onForgotPassword={switchToForgotPassword}
        />
      );
  }
};

export default AuthContainer; 