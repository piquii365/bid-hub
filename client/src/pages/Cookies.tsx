import React from 'react';
import { Cookie, Settings, Info, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cookies() {
  const { theme } = useApp();

  const cookieTypes = [
    {
      title: "Essential Cookies",
      description: "Required for the website to function properly. These cannot be disabled.",
      examples: ["Authentication", "Security", "Form submissions"]
    },
    {
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      examples: ["Page views", "User behavior", "Performance metrics"]
    },
    {
      title: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaign effectiveness.",
      examples: ["Ad targeting", "Conversion tracking", "Social media integration"]
    },
    {
      title: "Preference Cookies",
      description: "Remember your settings and preferences for a better experience.",
      examples: ["Language settings", "Theme preferences", "Layout choices"]
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-red-900/80 to-orange-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Cookie className="h-4 w-4 mr-2" />
              Cookie Information
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Cookie
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
                Policy
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Learn about how we use cookies to enhance your browsing experience 
              and provide personalized services on our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-8 mb-8`}>
            <div className="flex items-center space-x-3 mb-6">
              <Cookie className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Cookie Policy
              </h2>
            </div>
            
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Last updated: January 1, 2025
            </p>

            <div className={`mb-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                    What are Cookies?
                  </h4>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    Cookies are small text files stored on your device when you visit our website. 
                    They help us provide you with a better, faster, and safer experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <div key={index} className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {type.title}
                  </h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {type.description}
                  </p>
                  <div>
                    <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      Examples:
                    </h4>
                    <ul className="space-y-1">
                      {type.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {example}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-12 p-6 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-800' : 'bg-orange-50 border border-orange-200'}`}>
              <div className="flex items-start space-x-3">
                <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-orange-200' : 'text-orange-800'}`}>
                    Managing Your Cookie Preferences
                  </h4>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                    You can control and manage cookies through your browser settings. 
                    Note that disabling certain cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}