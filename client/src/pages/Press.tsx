import React from 'react';
import { Newspaper, Calendar, ExternalLink, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Press() {
  const { theme } = useApp();

  const pressReleases = [
    {
      title: "BidHub Reaches 50,000 Active Users Milestone",
      date: "January 15, 2025",
      excerpt: "Leading property auction platform celebrates significant growth in user base and transaction volume.",
      category: "Company News"
    },
    {
      title: "New AI-Powered Property Valuation Feature Launched",
      date: "December 10, 2024",
      excerpt: "Revolutionary technology helps users make informed bidding decisions with accurate property assessments.",
      category: "Product Update"
    },
    {
      title: "BidHub Expands to 10 New International Markets",
      date: "November 22, 2024",
      excerpt: "Global expansion brings trusted auction platform to property investors across Europe and Asia.",
      category: "Expansion"
    },
    {
      title: "Series A Funding Round Raises $10M for Platform Growth",
      date: "October 5, 2024",
      excerpt: "Investment will fuel technology development and market expansion initiatives.",
      category: "Funding"
    }
  ];

  const mediaKit = [
    { name: "Company Logo (PNG)", size: "2.1 MB" },
    { name: "Brand Guidelines", size: "5.3 MB" },
    { name: "Executive Photos", size: "8.7 MB" },
    { name: "Product Screenshots", size: "12.4 MB" }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-blue-900/80 to-purple-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Newspaper className="h-4 w-4 mr-2" />
              Media Center
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Press &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Media
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Stay updated with the latest news, announcements, and media resources from BidHub. 
              Find press releases, company information, and media assets.
            </p>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Latest Press Releases
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Recent news and announcements from BidHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressReleases.map((release, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm hover:shadow-lg transition-shadow`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    release.category === 'Company News' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    release.category === 'Product Update' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    release.category === 'Expansion' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  }`}>
                    {release.category}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{release.date}</span>
                  </div>
                </div>

                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {release.title}
                </h3>

                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {release.excerpt}
                </p>

                <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  <span>Read Full Release</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Media Kit
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Download our brand assets and media resources
            </p>
          </div>

          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaKit.map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                  <div>
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.size}
                    </p>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-12 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900 to-blue-900' : 'bg-gradient-to-r from-purple-600 to-blue-600'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Media Inquiries
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              For press inquiries, interviews, or additional information, please contact our media team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:press@bidhub.com"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Press Team
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                General Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}