import React from 'react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Safety() {
  const { theme } = useApp();

  const safetyFeatures = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Identity Verification",
      description: "All users undergo thorough identity verification to ensure a trusted community.",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Payments",
      description: "All transactions are protected with bank-level encryption and fraud detection.",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Property Verification",
      description: "Every property listing is verified by our team before going live.",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "24/7 Monitoring",
      description: "Our security team monitors all activities to detect and prevent suspicious behavior.",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  const safetyTips = [
    {
      title: "Verify Property Details",
      tips: [
        "Always review property photos and descriptions carefully",
        "Ask for additional documentation if needed",
        "Research the property location and market value",
        "Schedule a viewing when possible"
      ]
    },
    {
      title: "Secure Bidding Practices",
      tips: [
        "Set a maximum budget before bidding",
        "Don't share your bidding strategy with others",
        "Be aware of auction end times",
        "Only bid what you can afford"
      ]
    },
    {
      title: "Payment Security",
      tips: [
        "Only use our secure payment system",
        "Never send money outside the platform",
        "Keep records of all transactions",
        "Report suspicious payment requests"
      ]
    },
    {
      title: "Account Protection",
      tips: [
        "Use a strong, unique password",
        "Enable two-factor authentication",
        "Keep your contact information updated",
        "Log out from shared devices"
      ]
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-green-900/80 to-blue-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Shield className="h-4 w-4 mr-2" />
              Your Safety First
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Safety &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                Security
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Your safety and security are our top priorities. Learn about our comprehensive 
              measures to protect you and your transactions on our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              How We Keep You Safe
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Multiple layers of security protect every aspect of your experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm hover:shadow-lg transition-shadow text-center`}>
                <div className={`inline-flex p-4 rounded-xl mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} ${feature.color}`}>
                  {feature.icon}
                </div>
                
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Safety Tips for Users
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Follow these best practices to ensure a safe and secure experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyTips.map((category, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
                
                <ul className="space-y-3">
                  {category.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-red-200' : 'text-red-800'}`}>
                  Report Suspicious Activity
                </h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  If you encounter any suspicious activity, fraudulent listings, or security concerns, 
                  please report them immediately. Our security team investigates all reports promptly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Report Issue
                  </button>
                  <button className={`px-6 py-3 rounded-lg font-semibold border-2 transition-colors ${
                    theme === 'dark'
                      ? 'border-red-400 text-red-400 hover:bg-red-400 hover:text-white'
                      : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                  }`}>
                    Contact Security Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-12 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900 to-green-900' : 'bg-gradient-to-r from-blue-600 to-green-600'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Questions About Safety?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our security team is available 24/7 to address your safety concerns and questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Security Team
              </a>
              <a
                href="/help"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Safety FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}