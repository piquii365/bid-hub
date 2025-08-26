import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Privacy() {
  const { theme } = useApp();

  const sections = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Information We Collect",
      content: "We collect information you provide directly, such as account details, bidding history, and communication preferences."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "How We Use Your Information",
      content: "Your information helps us provide services, process transactions, communicate with you, and improve our platform."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access."
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information at any time through your account settings."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "International Transfers",
      content: "Your data may be transferred to and processed in countries other than your own, with appropriate safeguards in place."
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
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-blue-900/80 to-green-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Shield className="h-4 w-4 mr-2" />
              Your Privacy Matters
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Privacy
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                Policy
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              We are committed to protecting your privacy and ensuring the security of your personal information. 
              Learn how we collect, use, and safeguard your data.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-8 mb-8`}>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Privacy Policy
              </h2>
            </div>
            
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Last updated: January 1, 2025
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'} text-green-600 dark:text-green-400`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {section.title}
                      </h3>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-12 p-6 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
              <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-green-200' : 'text-green-800'}`}>
                Contact Us About Privacy
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                If you have questions about this Privacy Policy, please contact us at privacy@bidhub.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}