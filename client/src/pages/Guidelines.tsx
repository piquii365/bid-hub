import React from 'react';
import { Users, Shield, AlertTriangle, CheckCircle, MessageCircle, Flag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Guidelines() {
  const { theme } = useApp();

  const guidelines = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Respectful Communication",
      rules: [
        "Treat all users with respect and courtesy",
        "Use professional language in all communications",
        "No harassment, discrimination, or offensive content",
        "Respect privacy and confidentiality"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fair Bidding Practices",
      rules: [
        "Bid only with genuine intent to purchase",
        "No bid manipulation or artificial inflation",
        "Honor all winning bids and complete transactions",
        "Report suspicious bidding activity"
      ]
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Accurate Listings",
      rules: [
        "Provide truthful and complete property descriptions",
        "Use recent, high-quality photos",
        "Disclose all known defects or issues",
        "Set realistic starting prices and reserves"
      ]
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Platform Usage",
      rules: [
        "Use the platform only for legitimate transactions",
        "No spam, advertising, or promotional content",
        "Protect your account credentials",
        "Follow all applicable laws and regulations"
      ]
    }
  ];

  const violations = [
    {
      severity: "Minor",
      examples: ["Late payment", "Incomplete profile", "Minor listing errors"],
      consequences: ["Warning", "Account review", "Temporary restrictions"],
      color: "yellow"
    },
    {
      severity: "Moderate",
      examples: ["Bid retraction", "Misleading descriptions", "Unprofessional conduct"],
      consequences: ["Account suspension", "Fee penalties", "Listing removal"],
      color: "orange"
    },
    {
      severity: "Severe",
      examples: ["Fraud", "Identity theft", "Harassment", "Fake listings"],
      consequences: ["Permanent ban", "Legal action", "Law enforcement referral"],
      color: "red"
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-blue-900/80 to-purple-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Users className="h-4 w-4 mr-2" />
              Community Standards
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Community
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Guidelines
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Our community guidelines ensure a safe, fair, and respectful environment for all users. 
              Please read and follow these important rules.
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Community Standards
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              These guidelines help maintain a positive experience for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guidelines.map((guideline, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} text-purple-600 dark:text-purple-400`}>
                    {guideline.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {guideline.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {guideline.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Violations Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Violation Consequences
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Understanding the consequences of guideline violations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {violations.map((violation, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 ${
                violation.color === 'yellow' ? 'border-yellow-500' :
                violation.color === 'orange' ? 'border-orange-500' :
                'border-red-500'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {violation.severity} Violations
                </h3>
                
                <div className="mb-6">
                  <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    Examples:
                  </h4>
                  <ul className="space-y-1">
                    {violation.examples.map((example, idx) => (
                      <li key={idx} className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    Consequences:
                  </h4>
                  <ul className="space-y-1">
                    {violation.consequences.map((consequence, idx) => (
                      <li key={idx} className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        • {consequence}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
            <div className="flex items-start space-x-4">
              <Flag className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                  Report Violations
                </h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                  Help us maintain a safe community by reporting violations of our guidelines. 
                  All reports are reviewed by our moderation team and appropriate action is taken.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Report Violation
                  </button>
                  <button className={`px-6 py-3 rounded-lg font-semibold border-2 transition-colors ${
                    theme === 'dark'
                      ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  }`}>
                    Contact Moderators
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appeal Process */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Appeal Process
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              If you believe an action was taken in error, you can appeal the decision
            </p>
          </div>

          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Submit Appeal
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Submit your appeal with detailed explanation
                </p>
              </div>
              
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Review Process
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Our team reviews your case within 48 hours
                </p>
              </div>
              
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Decision
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  You'll receive our decision via email
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Submit Appeal
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}