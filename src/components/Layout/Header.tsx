import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Moon, 
  Sun,
  Gavel,
  LogOut,
  Settings,
  PlusCircle,
  Home,
  Grid,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import NotificationDropdown from './NotificationDropdown';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, notifications } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const navigation = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Browse', href: '/browse', icon: <Grid className="h-4 w-4" /> },
    { name: 'Live Auctions', href: '/live-auctions', icon: <Clock className="h-4 w-4" /> },
    { name: 'About', href: '/about', icon: null },
    { name: 'Contact', href: '/contact', icon: null },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md ${
      theme === 'dark' 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    } border-b transition-all duration-200 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'} transition-colors`}>
              <Gavel className="h-7 w-7 text-blue-600" />
            </div>
            <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              BidHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? theme === 'dark' 
                      ? 'text-blue-400 bg-blue-900/30 shadow-lg' 
                      : 'text-blue-600 bg-blue-50 shadow-lg'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..."
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-800'
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg`}
              />
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Add Property Button */}
                {user?.role === 'seller' && (
                  <Link
                    to="/add-property"
                    className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Property</span>
                  </Link>
                )}

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className={`p-2.5 rounded-xl transition-all duration-200 relative ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  <NotificationDropdown 
                    isOpen={isNotificationOpen} 
                    onClose={() => setIsNotificationOpen(false)} 
                  />
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                      />
                    ) : (
                      <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className={`hidden lg:block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {user?.name}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className={`absolute right-0 mt-3 w-56 rounded-xl shadow-xl border ${
                      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    } py-2 z-50 backdrop-blur-md`}>
                      <Link
                        to="/dashboard"
                        className={`flex items-center space-x-3 px-4 py-3 text-sm ${
                          theme === 'dark' 
                            ? 'text-gray-200 hover:bg-gray-700/50' 
                            : 'text-gray-700 hover:bg-gray-100/50'
                        } transition-all duration-200 rounded-lg mx-2`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/settings"
                        className={`flex items-center space-x-3 px-4 py-3 text-sm ${
                          theme === 'dark' 
                            ? 'text-gray-200 hover:bg-gray-700/50' 
                            : 'text-gray-700 hover:bg-gray-100/50'
                        } transition-all duration-200 rounded-lg mx-2`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className={`my-2 mx-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`} />
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-sm ${
                          theme === 'dark' 
                            ? 'text-red-400 hover:bg-gray-700/50' 
                            : 'text-red-600 hover:bg-gray-100/50'
                        } transition-all duration-200 rounded-lg mx-2`}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden py-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md`}>
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search properties..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-800'
                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                />
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-200 rounded-xl ${
                    location.pathname === item.href
                      ? theme === 'dark' 
                        ? 'text-blue-400 bg-blue-900/30' 
                        : 'text-blue-600 bg-blue-50'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}