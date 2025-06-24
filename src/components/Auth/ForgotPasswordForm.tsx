import React, { useState } from 'react';
import { HiMail, HiArrowLeft } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { resetPassword, isLoading, error } = useAuth();

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email is invalid';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setValidationError(emailError);
      return;
    }

    setValidationError('');

    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E0D0D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-[#C9FF3B] rounded-full flex items-center justify-center">
              <HiMail className="h-6 w-6 text-black" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Check your email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              We've sent a password reset link to
            </p>
            <p className="text-center text-sm text-white font-medium">
              {email}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="bg-[#242424] border border-gray-600 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                Didn't receive the email? Check your spam folder or try again with a different email address.
              </p>
            </div>

            <button
              onClick={onSwitchToLogin}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-600 text-sm font-medium rounded-lg text-white bg-[#242424] hover:bg-[#5A5A5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <HiArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0D0D] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none relative block w-full px-3 pl-10 py-3 border ${
                  validationError ? 'border-red-500' : 'border-gray-600'
                } placeholder-gray-400 text-white bg-[#242424] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9FF3B] focus:border-transparent`}
                placeholder="Email address"
              />
            </div>
            {validationError && (
              <p className="mt-1 text-sm text-red-400">{validationError}</p>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-[#C9FF3B] hover:bg-[#B3E237] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9FF3B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>

            <button
              type="button"
              onClick={onSwitchToLogin}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-600 text-sm font-medium rounded-lg text-white bg-[#242424] hover:bg-[#5A5A5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <HiArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 