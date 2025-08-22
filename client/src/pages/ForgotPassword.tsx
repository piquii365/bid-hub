import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Gavel, Shield, Users, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ForgotPassword() {
  const { theme } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
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
                Secure Account
                <span className="block text-blue-400">Recovery</span>
              </h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Don't worry, it happens to the best of us. We'll help you get back 
                to your account quickly and securely.
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
                <div className="text-2xl font-bold text-white mb-2">Need Help?</div>
                <div className="text-gray-300">Our support team is here 24/7</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
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

            {/* Back to Login */}
            <Link
              to="/login"
              className={`inline-flex items-center space-x-2 mb-8 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Link>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Forgot Password?
                  </h2>
                  <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your email address"
                        required
                      />
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
                        Sending Reset Link...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Remember your password?{' '}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                
                <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Check Your Email
                </h2>
                
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                
                <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong>Didn't receive the email?</strong>
                  </p>
                  <ul className={`text-xs mt-2 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• Check your spam/junk folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• Wait a few minutes for the email to arrive</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Try Different Email
                  </button>
                  
                  <Link
                    to="/login"
                    className="block w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}