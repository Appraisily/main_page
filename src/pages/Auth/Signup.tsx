import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { register } from '@/lib/auth/authService';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  // Password strength validation
  const passwordValidation = {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  // Check if passwords match
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    // Validate minimum password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('🚀 Signup Request:', {
        email,
        passwordLength: password.length,
        apiUrl: import.meta.env.VITE_AUTH_API_URL || 'https://auth-service-856401495068.us-central1.run.app/api/auth'
      });

      const response = await register({ 
        email, 
        password,
        confirmPassword
      });

      console.log('✅ Signup Response:', {
        success: true,
        userId: response.user?.id,
        email: response.user?.email,
        timestamp: new Date().toISOString()
      });

      loginContext(response.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Signup Error:', {
        error: err instanceof Error ? err.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        details: err
      });
      setError(err instanceof Error ? err.message : 'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_AUTH_API_URL || 'https://auth-service-856401495068.us-central1.run.app/api/auth'}/google`;
  };

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
              Create your account
            </h1>
            <p className="text-sm text-gray-500">
              Enter your email to create your account
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
            <form onSubmit={handleSubmit}>
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

                <div className="grid gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 pl-10 pr-10 py-2 text-sm ring-offset-white focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <div className="grid gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`h-3 w-3 ${passwordValidation.hasMinLength ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className="text-gray-500">At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`h-3 w-3 ${passwordValidation.hasUppercase && passwordValidation.hasLowercase ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className="text-gray-500">Upper & lowercase letters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`h-3 w-3 ${passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className="text-gray-500">At least 1 number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`h-3 w-3 ${passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className="text-gray-500">At least 1 special character</span>
                    </div>
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
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 pl-10 pr-10 py-2 text-sm ring-offset-white focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-500">
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !passwordsMatch || !agreeToTerms}
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
                      <span>Creating account...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Create Account</span>
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignup}
              className="inline-flex items-center justify-center space-x-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              <span className="text-gray-600">Continue with Google</span>
            </button>
          </div>

          <p className="px-8 text-center text-sm text-gray-500">
            <span>Already have an account?</span>{' '}
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-gray-900"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}