import React from 'react';
import { UserPlus, Search, Gavel, Trophy, ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HowItWorks() {
  const { theme } = useApp();

  const steps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: "Create Account",
      description: "Sign up for free and verify your identity to start bidding or selling.",
      details: ["Quick registration process", "Identity verification", "Choose bidder or seller role"]
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Browse Properties",
      description: "Explore our extensive catalog of properties and items up for auction.",
      details: ["Advanced search filters", "Detailed property information", "High-quality images"]
    },
    {
      icon: <Gavel className="h-8 w-8" />,
      title: "Place Bids",
      description: "Participate in live auctions, sealed bids, or buy items at fixed prices.",
      details: ["Real-time bidding", "Automatic bid increments", "Bid history tracking"]
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Win & Complete",
      description: "Win auctions and complete secure transactions with our payment system.",
      details: ["Secure payment processing", "Transaction protection", "Delivery coordination"]
    }
  ];

  const auctionTypes = [
    {
      title: "Live Auctions",
      description: "Real-time competitive bidding with instant updates",
      features: ["Live bid updates", "Time-based endings", "Competitive atmosphere"]
    },
    {
      title: "Sealed Bid Auctions",
      description: "Private bidding where bids are revealed at auction end",
      features: ["Confidential bidding", "Strategic advantage", "Fair competition"]
    },
    {
      title: "Fixed Price Sales",
      description: "Buy immediately at a set price without bidding",
      features: ["Instant purchase", "No waiting", "Guaranteed price"]
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-green-900/80 to-blue-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Gavel className="h-4 w-4 mr-2" />
              Simple Process
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              How It
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                Works
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Get started with BidHub in just a few simple steps. 
              Our platform makes property bidding accessible and secure for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Getting Started is Easy
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Follow these simple steps to start your bidding journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm hover:shadow-lg transition-shadow text-center`}>
                  <div className={`inline-flex p-4 rounded-xl mb-6 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100'} text-blue-600 dark:text-blue-400`}>
                    {step.icon}
                  </div>
                  
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className={`h-6 w-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auction Types Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Types of Auctions
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Choose the bidding style that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {auctionTypes.map((type, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {type.title}
                </h3>
                
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {type.description}
                </p>

                <ul className="space-y-3">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-12 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful bidders and sellers on our platform today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Account
              </a>
              <a
                href="/browse"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Properties
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}