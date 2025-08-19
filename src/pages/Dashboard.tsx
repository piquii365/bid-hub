import React, { useState } from 'react';
import { 
  Gavel, 
  TrendingUp, 
  Clock, 
  Trophy, 
  AlertCircle,
  Plus,
  Eye,
  Heart,
  DollarSign,
  Filter,
  Calendar,
  User,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/Properties/PropertyCard';

export default function Dashboard() {
  const { theme, properties, bids, notifications } = useApp();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Please sign in to access your dashboard
          </h2>
        </div>
      </div>
    );
  }

  // Mock data based on user role
  const userBids = bids.filter(bid => bid.bidderId === 'current-user');
  const userProperties = user.role === 'seller' ? properties.filter(p => p.sellerId === user.id) : [];
  const watchedProperties = properties.slice(0, 3); // Mock watched properties
  
  const stats = user.role === 'bidder' ? [
    {
      label: 'Active Bids',
      value: userBids.filter(b => b.status === 'winning' || b.status === 'active').length,
      icon: <Gavel className="h-6 w-6" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'Auctions Won',
      value: userBids.filter(b => b.status === 'won').length,
      icon: <Trophy className="h-6 w-6" />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Total Spent',
      value: `$${userBids.filter(b => b.status === 'won').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      label: 'Watching',
      value: watchedProperties.length,
      icon: <Eye className="h-6 w-6" />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ] : [
    {
      label: 'Active Listings',
      value: userProperties.filter(p => p.status === 'active').length,
      icon: <Clock className="h-6 w-6" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'Properties Sold',
      value: userProperties.filter(p => p.status === 'sold').length,
      icon: <Trophy className="h-6 w-6" />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Total Revenue',
      value: `$${userProperties.filter(p => p.status === 'sold').reduce((sum, p) => sum + p.currentPrice, 0).toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      label: 'Total Views',
      value: '2,847',
      icon: <Eye className="h-6 w-6" />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="h-4 w-4" /> },
    { 
      id: user.role === 'bidder' ? 'bids' : 'listings', 
      label: user.role === 'bidder' ? 'My Bids' : 'My Listings', 
      icon: user.role === 'bidder' ? <Gavel className="h-4 w-4" /> : <Plus className="h-4 w-4" /> 
    },
    { id: 'watching', label: 'Watching', icon: <Eye className="h-4 w-4" /> },
    { id: 'activity', label: 'Activity', icon: <Clock className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
            )}
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Welcome back, {user.name}!
              </h1>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} capitalize`}>
                {user.role} Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.color} flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : theme === 'dark'
                    ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Recent Activity */}
              <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'won' ? 'bg-green-100 dark:bg-green-900/20' :
                          notification.type === 'outbid' ? 'bg-red-100 dark:bg-red-900/20' :
                          'bg-blue-100 dark:bg-blue-900/20'
                        }`}>
                          {notification.type === 'won' ? (
                            <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : notification.type === 'outbid' ? (
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          ) : (
                            <Gavel className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {notification.title}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {getTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                    theme === 'dark' 
                      ? 'border-gray-600 hover:border-blue-500 hover:bg-blue-900/10' 
                      : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                  }`}>
                    <Plus className={`h-8 w-8 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {user.role === 'seller' ? 'Add Property' : 'Browse Properties'}
                    </div>
                  </button>
                  <button className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                    theme === 'dark' 
                      ? 'border-gray-600 hover:border-green-500 hover:bg-green-900/10' 
                      : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                  }`}>
                    <Eye className={`h-8 w-8 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      View Watchlist
                    </div>
                  </button>
                  <button className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                    theme === 'dark' 
                      ? 'border-gray-600 hover:border-purple-500 hover:bg-purple-900/10' 
                      : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                  }`}>
                    <Settings className={`h-8 w-8 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Account Settings
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === (user.role === 'bidder' ? 'bids' : 'listings') && (
            <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {user.role === 'bidder' ? 'My Bids' : 'My Listings'}
                </h3>
                <div className="flex items-center space-x-4">
                  <select className={`px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Won</option>
                    <option>Lost</option>
                  </select>
                  <Filter className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              </div>

              {user.role === 'bidder' ? (
                <div className="space-y-4">
                  {userBids.map((bid) => {
                    const property = properties.find(p => p.id === bid.propertyId);
                    if (!property) return null;
                    
                    return (
                      <div
                        key={bid.id}
                        className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {property.title}
                              </h4>
                              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Your bid: ${bid.amount.toLocaleString()}
                              </p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                                {getTimeAgo(bid.timestamp)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              bid.status === 'winning' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : bid.status === 'outbid'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                            }`}>
                              {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                            </span>
                            <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              Current: ${property.currentPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} showWatchlist={false} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'watching' && (
            <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Watched Properties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}