import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Trophy, 
  TrendingUp,
  Eye,
  Heart,
  Settings,
  Edit
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/Properties/PropertyCard';

export default function Profile() {
  const { theme, properties, bids } = useApp();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Please sign in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  const userProperties = properties.filter(p => p.sellerId === user.id);
  const userBids = bids.filter(b => b.bidderId === user.id);
  const watchedProperties = properties.slice(0, 3); // Mock watched properties

  const stats = [
    {
      label: 'Properties Listed',
      value: userProperties.length,
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Successful Bids',
      value: userBids.filter(b => b.status === 'won').length,
      icon: <Trophy className="h-5 w-5" />,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Total Views',
      value: '2,847',
      icon: <Eye className="h-5 w-5" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Saved Properties',
      value: watchedProperties.length,
      icon: <Heart className="h-5 w-5" />,
      color: 'text-red-600 dark:text-red-400'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'properties', label: 'My Properties' },
    { id: 'bids', label: 'My Bids' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-8 mb-8`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-700"
                />
              ) : (
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
              )}
              
              <div>
                <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {user.name}
                </h1>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} capitalize`}>
                  {user.role}
                </p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      New York, NY
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className={`text-sm ml-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      4.9 (127 reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 lg:mt-0 flex space-x-3">
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}>
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-sm text-center`}
            >
              <div className={`inline-flex p-3 rounded-lg mb-3 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              } ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : theme === 'dark'
                    ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Activity */}
                <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6`}>
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Placed bid on', item: 'Luxury Downtown Penthouse', time: '2 hours ago' },
                      { action: 'Listed', item: 'Modern Office Building', time: '1 day ago' },
                      { action: 'Won auction for', item: '2023 Tesla Model S', time: '3 days ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <div className="flex-1">
                          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            <span className="font-medium">{activity.action}</span>{' '}
                            <span className="text-blue-600 dark:text-blue-400">{activity.item}</span>
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6`}>
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    About
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Experienced property investor with over 10 years in the real estate market. 
                    Specializing in commercial properties and luxury residential investments. 
                    Always looking for unique opportunities and fair deals.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Achievements */}
                <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6`}>
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Top Seller', description: 'Sold 10+ properties', icon: '🏆' },
                      { title: 'Trusted Bidder', description: '100% payment rate', icon: '⭐' },
                      { title: 'Early Adopter', description: 'Member since 2020', icon: '🚀' }
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {achievement.title}
                          </div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6`}>
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Contact
                  </h3>
                  <div className="space-y-2">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Response time:</span> Within 2 hours
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Languages:</span> English, Spanish
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  My Properties ({userProperties.length})
                </h3>
              </div>
              {userProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} showWatchlist={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 mx-auto mb-4 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  } rounded-full flex items-center justify-center`}>
                    <TrendingUp className={`h-8 w-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    No Properties Listed
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    Start by listing your first property for auction.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bids' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  My Bids ({userBids.length})
                </h3>
              </div>
              <div className="space-y-4">
                {userBids.map((bid) => {
                  const property = properties.find(p => p.id === bid.propertyId);
                  if (!property) return null;
                  
                  return (
                    <div
                      key={bid.id}
                      className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
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
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            bid.status === 'winning' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : bid.status === 'outbid'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                          }`}>
                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <Star className={`h-16 w-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Reviews Coming Soon
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                User reviews and ratings will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}