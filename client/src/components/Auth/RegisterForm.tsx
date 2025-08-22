import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, UserCheck, Gavel, Shield, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, loginWithGoogle, loading } = useAuth();
  const { theme } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'bidder' as 'bidder' | 'seller',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  // Input sanitization function
  const sanitizeInput = (input: string) => {
    return input.trim().replace(/[<>]/g, '');
  };

  // Name validation
  const validateName = (name: string) => {
    return name.length >= 2 && name.length <= 50;
  };

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = field === 'role' ? value : sanitizeInput(value);
    setFormData({ ...formData, [field]: sanitizedValue });
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: '' });
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    if (!formData.name) {
      errors.name = 'Full name is required';
    } else if (!validateName(formData.name)) {
      errors.name = 'Name must be between 2 and 50 characters';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google registration failed');
    }
  };

  const features = [
    {
      icon: <Gavel className="h-4 w-4" />,
      title: "Live Auctions",
      description: "Real-time bidding",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Secure Platform",
      description: "Enterprise security",
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "50K+ Users",
      description: "Trusted globally",
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      title: "98% Success",
      description: "High satisfaction",
    },
  ];

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Full Page Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/finding-your-place-on-earth.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex">
        {/* Left Side - BidHub Info (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <a href='/' className="flex items-center space-x-3 mb-6">
              <div className="backdrop-blur-sm">
                <img src="/logo.png" alt="Logo" className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold">BidHub</h1>
            </a>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Start Your Investment
              <span className="block text-blue-400">Journey Today</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join the most trusted property bidding platform and discover
              amazing investment opportunities. Whether you're buying or
              selling, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm text-blue-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                Ready to get started?
              </div>
              <div className="text-sm text-gray-300">
                Join thousands of successful investors
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Transparent Form Container */}
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
              {/* Logo */}
              <a href='/' className="flex items-center justify-center space-x-3 mb-6">
                <div className="backdrop-blur-sm">
                  <img src="/logo.png" alt="Logo" className="h-10 w-10 text-white" />
                </div>
                <span
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  BidHub
                </span>
              </a>

              <div className="text-center mb-6">
                <h2
                  className={`text-3xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Create Account
                </h2>
                <p
                  className={`mt-2 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Join BidHub and start bidding today
                </p>
              </div>

              {error && (
                <div className="mb-4 flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border backdrop-blur-sm transition-colors ${
                        fieldErrors.name
                          ? "border-red-500 focus:border-red-500"
                          : theme === "dark"
                          ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border backdrop-blur-sm transition-colors ${
                        fieldErrors.email
                          ? "border-red-500 focus:border-red-500"
                          : theme === "dark"
                          ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange("role", "bidder")}
                      className={`flex items-center justify-center p-3 rounded-lg border backdrop-blur-sm transition-colors ${
                        formData.role === "bidder"
                          ? theme === "dark"
                            ? "bg-blue-900/50 border-blue-500 text-blue-200"
                            : "bg-blue-50/80 border-blue-500 text-blue-700"
                          : theme === "dark"
                          ? "bg-gray-800/30 border-gray-600 text-gray-300 hover:bg-gray-700/50"
                          : "bg-white/30 border-gray-300 text-gray-700 hover:bg-gray-50/50"
                      }`}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Bidder</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("role", "seller")}
                      className={`flex items-center justify-center p-3 rounded-lg border backdrop-blur-sm transition-colors ${
                        formData.role === "seller"
                          ? theme === "dark"
                            ? "bg-blue-900/50 border-blue-500 text-blue-200"
                            : "bg-blue-50/80 border-blue-500 text-blue-700"
                          : theme === "dark"
                          ? "bg-gray-800/30 border-gray-600 text-gray-300 hover:bg-gray-700/50"
                          : "bg-white/30 border-gray-300 text-gray-700 hover:bg-gray-50/50"
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Seller</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full pl-10 pr-12 py-3 rounded-lg border backdrop-blur-sm transition-colors ${
                        fieldErrors.password
                          ? "border-red-500 focus:border-red-500"
                          : theme === "dark"
                          ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-gray-300"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={`w-full pl-10 pr-12 py-3 rounded-lg border backdrop-blur-sm transition-colors ${
                        fieldErrors.confirmPassword
                          ? "border-red-500 focus:border-red-500"
                          : theme === "dark"
                          ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-gray-300"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    title="I agree to the terms and conditions"
                    type="checkbox"
                    required
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-white/50"
                  />
                  <span
                    className={`ml-2 text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className={`w-full border-t ${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span
                      className={`px-2 ${
                        theme === "dark"
                          ? "bg-gray-900/95 text-gray-400"
                          : "bg-white/95 text-gray-500"
                      }`}
                    >
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className={`mt-4 w-full flex items-center justify-center px-4 py-3 rounded-lg border backdrop-blur-sm transition-colors shadow-lg ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800/50 hover:bg-gray-800/70 text-white"
                      : "border-gray-300 bg-white/50 hover:bg-white/70 text-gray-900"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-4 h-4 mr-2"
                  />
                  Continue with Google
                </button>
              </div>

              <p
                className={`mt-6 text-center text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}