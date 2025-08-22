import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Gavel, Shield, Users, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ResetPassword() {
  const { theme } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    // Validate token on component mount
    if (!token) {
      setTokenValid(false);
      return;
    }

    // In a real app, you would validate the token with your backend
    // For now, we'll assume it's valid
    setTokenValid(true);
  }, [token]);

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Gavel className="h-5 w-5" />,
      title: 'Live Auctions',
      description: 'Real-time bidding experience'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: '50K+ Users',
      description: 'Trusted by thousands'
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: '98% Success',
      description: 'High satisfaction rate'
    }
  ];

  if (!tokenValid) {
    return (
      <div className={`h-screen overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Invalid Reset Link
          </h2>
          
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          
          <Link
            to="/forgot-password"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="h-full flex">
        {/* Left Side - BidHub Info */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/property-with-land.jpeg')"
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-600">
                  <Gavel className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold">BidHub</h1>
              </div>
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                Create a New
                <span className="block text-blue-400">Secure Password</span>
              </h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                You're almost done! Create a strong password to secure your account 
                and get back to bidding on amazing properties.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-blue-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Almost There!</div>
                <div className="text-gray-300">One more step to secure your account</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-600">
                <Gavel className="h-6 w-6 text-white" />
              </div>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                BidHub
              </span>
            </div>

            {!isSuccess ? (
              <>
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Reset Password
                  </h2>
                  <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Enter your new password below
                  </p>
                </div>

                {error && (
                  <div className="mb-4 flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Resetting Password...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                
                <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Password Reset Successfully!
                </h2>
                
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your password has been reset successfully. You will be redirected to the login page shortly.
                </p>
                
                <Link
                  to="/login"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}