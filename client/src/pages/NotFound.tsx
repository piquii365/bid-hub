import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotFound() {
  const { theme } = useApp();

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors`}>
      <div className="max-w-md mx-auto text-center px-4">
        <div className={`text-9xl font-bold mb-4 ${
          theme === 'dark' ? 'text-gray-700' : 'text-gray-300'
        }`}>
          404
        </div>
        
        <h1 className={`text-3xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Page Not Found
        </h1>
        
        <p className={`text-lg mb-8 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/browse"
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Browse Properties</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>

        <div className={`mt-12 p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <h3 className={`font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Need Help?
          </h3>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            If you believe this is an error, please{' '}
            <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}