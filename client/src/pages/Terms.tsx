import React from 'react';
import { Shield, FileText, Users, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Terms() {
  const { theme } = useApp();

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using BidHub, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      title: "User Accounts",
      content: "You are responsible for safeguarding the password and for maintaining the confidentiality of your account."
    },
    {
      title: "Bidding Rules",
      content: "All bids are binding. Once placed, bids cannot be retracted except in specific circumstances outlined in our policies."
    },
    {
      title: "Payment Terms",
      content: "Winners must complete payment within 48 hours of auction end. Failure to pay may result in account suspension."
    },
    {
      title: "Prohibited Activities",
      content: "Users may not engage in fraudulent bidding, manipulation of auctions, or any other activities that compromise platform integrity."
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Scale className="h-4 w-4 mr-2" />
              Legal Documentation
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Terms of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Service
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Please read these terms carefully before using our platform. 
              These terms govern your use of BidHub and outline your rights and responsibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-8 mb-8`}>
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Terms and Conditions
              </h2>
            </div>
            
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Last updated: January 1, 2025
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className={`mt-12 p-6 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                    Important Notice
                  </h4>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    These terms are subject to change. We will notify users of any significant changes via email or platform notifications.
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