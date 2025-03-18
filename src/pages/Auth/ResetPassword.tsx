import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { requestPasswordReset, completePasswordReset } from '@/lib/auth/authService';

function RequestForm({ 
  email, 
  setEmail, 
  handleRequestSubmit, 
  isLoading, 
  error 
}: {
  email: string;
  setEmail: (email: string) => void;
  handleRequestSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  error: string;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-white text-gray-900">
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Link to="/" className="mx-auto">
              <img
                src="https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638"
                alt="Appraisily"
                className="h-12 w-auto"
              />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Reset your password
            </h1>
            <p className="text-sm text-gray-500">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-2 text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          <div className="grid gap-6">
            <form onSubmit={handleRequestSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 pl-10 py-2 text-sm ring-offset-white focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-50 hover:bg-gray-800 h-10 px-4 py-2"
                >
                  {isLoading ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Sending link...</span>
                    </span>
                  ) : (
                    "Send password reset link"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center">
            <Link
              to="/login"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordResetForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleResetSubmit,
  isLoading,
  error,
  showPassword,
  setShowPassword,
}: {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  handleResetSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  error: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-white text-gray-900">
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Link to="/" className="mx-auto">
              <img
                src="https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638"
                alt="Appraisily"
                className="h-12 w-auto"
              />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Create new password
            </h1>
            <p className="text-sm text-gray-500">
              Enter your new password below
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-2 text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          <div className="grid gap-6">
            <form onSubmit={handleResetSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 pl-10 pr-10 py-2 text-sm ring-offset-white focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 pl-10 pr-10 py-2 text-sm ring-offset-white focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-50 hover:bg-gray-800 h-10 px-4 py-2"
                >
                  {isLoading ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Resetting password...</span>
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Extract token from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      setToken(urlToken);
    }
  }, [location]);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Call the password reset request API
      await requestPasswordReset(email);
      
      // Show success message
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      console.error('Password reset request error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!token) {
      setError('Invalid reset token. Please try requesting a new password reset link.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the password reset API with token and new password
      await completePasswordReset(token, password, confirmPassword);
      
      // Show success message
      setResetSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show request success
  if (success) {
    return (
      <div className="min-h-screen flex flex-col justify-center bg-white text-gray-900">
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Check Your Email</h2>
              <p className="text-sm text-gray-600 max-w-xs">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your email and follow the instructions to reset your password.
              </p>
              <p className="text-xs text-gray-500">
                If you don't see the email, check your spam folder.
              </p>
            </div>
            <div className="grid gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-gray-900 text-gray-50 hover:bg-gray-800 transition-colors"
              >
                Return to Login
              </Link>
              <button 
                onClick={() => setSuccess(false)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Try a different email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show reset success
  if (resetSuccess) {
    return (
      <div className="min-h-screen flex flex-col justify-center bg-white text-gray-900">
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Password Reset Complete</h2>
              <p className="text-sm text-gray-600 max-w-xs">
                Your password has been successfully reset. You will be redirected to the login page.
              </p>
            </div>
            <div className="grid gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-gray-900 text-gray-50 hover:bg-gray-800 transition-colors"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the password reset form if token exists
  if (token) {
    return (
      <PasswordResetForm
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleResetSubmit={handleResetSubmit}
        isLoading={isLoading}
        error={error}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    );
  }

  // Otherwise render the request form
  return (
    <RequestForm
      email={email}
      setEmail={setEmail}
      handleRequestSubmit={handleRequestSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}