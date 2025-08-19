import React, { useState, useEffect } from 'react';
import { Clock, Users, Zap, TrendingUp, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/Properties/PropertyCard';

export default function LiveAuctions() {
  const { properties, theme } = useApp();
  const [timeFilter, setTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('ending-soon');

  // Filter for live auctions only
  const liveAuctions = properties.filter(property => 
    property.bidType === 'live' && property.status === 'active'
  );

  // Apply time and sorting filters
  const filteredAuctions = liveAuctions
    .filter(auction => {
      if (timeFilter === 'all') return true;
      
      const now = new Date();
      const endDate = new Date(auction.endDate);
      const timeLeft = endDate.getTime() - now.getTime();
      const hoursLeft = timeLeft / (1000 * 60 * 60);
      
      switch (timeFilter) {
        case 'ending-soon':
          return hoursLeft <= 24;
        case 'this-week':
          return hoursLeft <= 168; // 7 days
        case 'new':
          const createdDate = new Date(auction.createdAt);
          const daysSinceCreated = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceCreated <= 3;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'ending-soon':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case 'most-bids':
          return b.totalBids - a.totalBids;
        case 'highest-price':
          return b.currentPrice - a.currentPrice;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const stats = [
    {
      label: 'Live Auctions',
      value: liveAuctions.length,
      icon: <Zap className="h-6 w-6" />,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      label: 'Active Bidders',
      value: '1,247',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'Ending Today',
      value: liveAuctions.filter(a => {
        const now = new Date();
        const endDate = new Date(a.endDate);
        const timeLeft = endDate.getTime() - now.getTime();
        return timeLeft <= 24 * 60 * 60 * 1000;
      }).length,
      icon: <Clock className="h-6 w-6" />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      label: 'Total Volume',
      value: '$2.4M',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    }
  ];

  const timeFilters = [
    { value: 'all', label: 'All Auctions' },
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'this-week', label: 'This Week' },
    { value: 'new', label: 'New Auctions' }
  ];

  const sortOptions = [
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'most-bids', label: 'Most Bids' },
    { value: 'highest-price', label: 'Highest Price' },
    { value: 'newest', label: 'Newest' }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className={`relative py-20 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-red-900 to-orange-900'
          : 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50'
      }`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                LIVE NOW
              </span>
            </div>
            <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Live
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                Auctions
              </span>
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience the thrill of real-time bidding. Join live auctions happening right now 
              and compete with bidders from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.color} flex items-center justify-center mb-4`}>
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
        </div>
      </section>

      {/* Filters and Auctions */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className={`p-6 rounded-xl mb-8 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-2">
                <Filter className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Filter by:
                </span>
                {timeFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setTimeFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeFilter === filter.value
                        ? 'bg-red-600 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-red-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-red-500'
                  } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {timeFilter === 'all' ? 'All Live Auctions' : 
               timeFilter === 'ending-soon' ? 'Ending Soon' :
               timeFilter === 'this-week' ? 'This Week' : 'New Auctions'}
            </h2>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredAuctions.length} auctions found
            </div>
          </div>

          {/* Auctions Grid */}
          {filteredAuctions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="relative">
                  <PropertyCard property={auction} />
                  {/* Live indicator */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className={`w-16 h-16 mx-auto mb-4 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              } rounded-full flex items-center justify-center`}>
                <Clock className={`h-8 w-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                No Live Auctions Found
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Try adjusting your filters or check back later for new auctions.
              </p>
              <button
                onClick={() => {
                  setTimeFilter('all');
                  setSortBy('ending-soon');
                }}
                className="text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300"
              >
                View All Auctions
              </button>
            </div>
          )}

          {/* Auto-refresh notice */}
          <div className={`mt-8 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-blue-800'
              }`}>
                Live auctions update automatically. Bid counts and prices refresh in real-time.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}