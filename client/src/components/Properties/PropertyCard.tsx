import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Heart,
  Eye,
  Gavel,
  Lock,
  ShoppingCart
} from 'lucide-react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';

interface PropertyCardProps {
  property: Property;
  showWatchlist?: boolean;
}

export default function PropertyCard({ property, showWatchlist = true }: PropertyCardProps) {
  const { theme } = useApp();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'residential':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'commercial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'land':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'car':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'electronics':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'vintage':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getBidTypeIcon = (bidType: string) => {
    switch (bidType) {
      case 'live':
        return <Gavel className="h-4 w-4" />;
      case 'sealed':
        return <Lock className="h-4 w-4" />;
      case 'fixed':
        return <ShoppingCart className="h-4 w-4" />;
      default:
        return <Gavel className="h-4 w-4" />;
    }
  };

  const getBidTypeColor = (bidType: string) => {
    switch (bidType) {
      case 'live':
        return 'text-red-500';
      case 'sealed':
        return 'text-yellow-500';
      case 'fixed':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const endDate = new Date(property.endDate);
    const diffMs = endDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Ended';
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className={`group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
    } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/property/${property.id}`}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(property.type)}`}>
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            theme === 'dark' ? 'bg-gray-900/80 text-white' : 'bg-white/90 text-gray-900'
          }`}>
            <span className={getBidTypeColor(property.bidType)}>
              {getBidTypeIcon(property.bidType)}
            </span>
            <span className="capitalize">{property.bidType}</span>
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>

        {/* Watchlist button */}
        {showWatchlist && (
          <button className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-900/80 hover:bg-gray-800 text-white' 
              : 'bg-white/90 hover:bg-white text-gray-900'
          } opacity-0 group-hover:opacity-100`}>
            <Heart className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/property/${property.id}`}>
          <h3 className={`font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } line-clamp-2`}>
            {property.title}
          </h3>
        </Link>

        <div className={`flex items-center text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>

        <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
          {property.description}
        </p>

        {/* Price and bid info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              ${property.currentPrice.toLocaleString()}
            </div>
            {property.currentPrice > property.startingPrice && (
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Starting: ${property.startingPrice.toLocaleString()}
              </div>
            )}
          </div>
          <div className={`text-right text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {property.totalBids} bids
            </div>
          </div>
        </div>

        {/* Time remaining */}
        <div className={`flex items-center justify-between text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Ends in {getTimeRemaining()}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {Math.floor(Math.random() * 100) + 20}
            </span>
            <span className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {property.bidType.charAt(0).toUpperCase() + property.bidType.slice(1)}
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-4">
          <Link
            to={`/property/${property.id}`}
            className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium transition-colors ${
              property.bidType === 'live'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : property.bidType === 'fixed'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {property.bidType === 'fixed' ? 'Buy Now' : property.bidType === 'sealed' ? 'Place Sealed Bid' : 'Join Live Auction'}
          </Link>
        </div>
      </div>
    </div>
  );
}