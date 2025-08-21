import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyGrid from '../components/Properties/PropertyGrid';
import PropertyFilters from '../components/Properties/PropertyFilters';

export default function Browse() {
  const { properties, theme } = useApp();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<any>({
    search: searchParams.get('search') || '',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      // Search filter
      if (
        filters.search &&
        !property.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !property.description.toLowerCase().includes(filters.search.toLowerCase()) &&
        !property.location.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Type filter
      if (filters.type && property.type !== filters.type) {
        return false;
      }

      // Bid type filter
      if (filters.bidType && property.bidType !== filters.bidType) {
        return false;
      }

      // Status filter
      if (filters.status && property.status !== filters.status) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const minPrice = parseFloat(filters.priceRange.min || '0');
        const maxPrice = parseFloat(filters.priceRange.max || '1000000000');

        if (minPrice && property.currentPrice < minPrice) {
          return false;
        }
        if (maxPrice && property.currentPrice > maxPrice) {
          return false;
        }
      }

      // Location filter
      if (
        filters.location &&
        !property.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'ending-soon':
        filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
      case 'most-bids':
        filtered.sort((a, b) => b.totalBids - a.totalBids);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [properties, filters, sortBy]);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'most-bids', label: 'Most Bids' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Browse Properties
              </h1>
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Discover amazing properties and investment opportunities
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className={`flex rounded-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <PropertyFilters onFiltersChange={setFilters} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Showing {filteredAndSortedProperties.length} of {properties.length} properties
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
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.search || filters.type || filters.bidType || filters.location || filters.priceRange?.min || filters.priceRange?.max) && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Active filters:
                  </span>
                  {filters.search && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                    }`}>
                      Search: "{filters.search}"
                    </span>
                  )}
                  {filters.type && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                    }`}>
                      Type: {filters.type}
                    </span>
                  )}
                  {filters.bidType && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                    }`}>
                      Bid: {filters.bidType}
                    </span>
                  )}
                  {(filters.priceRange?.min || filters.priceRange?.max) && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark' ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'
                    }`}>
                      Price: ${filters.priceRange?.min || '0'} - ${filters.priceRange?.max || '∞'}
                    </span>
                  )}
                  <button
                    onClick={() => setFilters({})}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* Properties Grid/List */}
            <PropertyGrid properties={filteredAndSortedProperties} />

            {/* Load More Button */}
            {filteredAndSortedProperties.length > 0 && (
              <div className="mt-12 text-center">
                <button className={`px-8 py-3 rounded-lg border-2 border-dashed transition-colors ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400'
                    : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'
                }`}>
                  Load More Properties
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}