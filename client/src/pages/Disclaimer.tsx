import React from 'react';
import { AlertTriangle, FileText, Shield, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Disclaimer() {
  const { theme } = useApp();

  const disclaimers = [
    {
      title: "Investment Risk",
      content: "All property investments carry inherent risks. Past performance does not guarantee future results. You should carefully consider your financial situation before participating in auctions."
    },
    {
      title: "Property Information",
      content: "While we strive to provide accurate property information, we cannot guarantee the completeness or accuracy of all details. Buyers should conduct their own due diligence."
    },
    {
      title: "Platform Availability",
      content: "We aim to maintain continuous service but cannot guarantee uninterrupted access. Maintenance, technical issues, or other factors may temporarily affect availability."
    },
    {
      title: "Third-Party Content",
      content: "Our platform may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these external sites."
    },
    {
      title: "Legal Compliance",
      content: "Users are responsible for ensuring their activities comply with applicable local, state, and federal laws. BidHub does not provide legal advice."
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-orange-900/80 to-red-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Important Information
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Legal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
                Disclaimer
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Important legal information and disclaimers regarding the use of our platform. 
              Please read carefully to understand your rights and responsibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-8 mb-8`}>
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Disclaimer
              </h2>
            </div>
            
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Last updated: January 1, 2025
            </p>

            <div className={`mb-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-red-200' : 'text-red-800'}`}>
                    Important Notice
                  </h4>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                    The information provided on this platform is for general informational purposes only. 
                    It should not be considered as professional financial, legal, or investment advice.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {disclaimers.map((disclaimer, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-6">
                  <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {disclaimer.title}
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {disclaimer.content}
                  </p>
                </div>
              ))}
            </div>

            <div className={`mt-12 p-6 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'}`}>
                    Limitation of Liability
                  </h4>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                    BidHub shall not be liable for any direct, indirect, incidental, special, or consequential damages 
                    resulting from the use or inability to use our services.
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