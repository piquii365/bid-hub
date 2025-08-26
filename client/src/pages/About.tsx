import React from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Shield, 
  Zap, 
  Heart,
  CheckCircle,
  Star,
  TrendingUp,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function About() {
  const { theme } = useApp();

  const stats = [
    { label: 'Active Users', value: '50K+', icon: <Users className="h-6 w-6" /> },
    { label: 'Properties Sold', value: '10K+', icon: <Award className="h-6 w-6" /> },
    { label: 'Success Rate', value: '98%', icon: <TrendingUp className="h-6 w-6" /> },
    { label: 'Countries', value: '25+', icon: <Globe className="h-6 w-6" /> },
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Trust & Security',
      description: 'We prioritize the security of every transaction with enterprise-grade encryption and fraud protection.',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Innovation',
      description: 'Cutting-edge technology powers our real-time bidding platform for seamless user experiences.',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Community First',
      description: 'Building lasting relationships with our users through exceptional service and support.',
      color: 'text-red-600 dark:text-red-400'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality platform for property bidding and investment.',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: '15+ years in real estate and fintech'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former tech lead at major auction platforms'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Expert in marketplace operations and growth'
    },
    {
      name: 'David Kim',
      role: 'Head of Security',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Cybersecurity specialist with 12+ years experience'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'BidHub was established with a vision to revolutionize property auctions' },
    { year: '2021', title: 'First 1K Users', description: 'Reached our first milestone of 1,000 registered users' },
    { year: '2022', title: 'Series A Funding', description: 'Secured $10M in Series A funding to expand our platform' },
    { year: '2023', title: 'International Expansion', description: 'Launched in 10 new countries across Europe and Asia' },
    { year: '2024', title: 'AI Integration', description: 'Introduced AI-powered property valuation and recommendations' },
    { year: '2025', title: 'Market Leader', description: 'Became the leading property auction platform with 50K+ users' }
  ];

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Star className="h-4 w-4 mr-2 text-yellow-400" />
              Trusted by 50,000+ investors worldwide
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Revolutionizing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Property Investment
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              We're democratizing access to premium real estate opportunities
              through innovative auction technology, making property investment
              accessible, transparent, and exciting for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Discover Our Story
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Watch Our Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl ${
                  theme === "dark" ? "bg-gray-800/80" : "bg-white/80"
                } backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border ${
                  theme === "dark" ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <div
                  className={`inline-flex p-4 rounded-xl mb-4 ${
                    theme === "dark" ? "bg-blue-900/20" : "bg-blue-100"
                  } text-blue-600`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-4xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        className={`py-20 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className={`text-3xl lg:text-4xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Our Mission
              </h2>
              <p
                className={`text-lg mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                At BidHub, we believe that everyone should have access to
                exciting investment opportunities. We've created a platform that
                combines the thrill of auctions with the security and
                transparency that modern investors demand.
              </p>
              <div className="space-y-4">
                {[
                  "Democratize access to property investment",
                  "Provide transparent and fair bidding processes",
                  "Ensure secure and reliable transactions",
                  "Build a thriving community of investors",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/house.jpg";
                }}
                className="rounded-2xl shadow-2xl"
              />
              <div
                className={`absolute -bottom-6 -left-6 p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-xl`}
              >
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div
                      className={`text-2xl font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      4.9/5
                    </div>
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      User Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl lg:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Our Values
            </h2>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-sm hover:shadow-lg transition-shadow`}
              >
                <div
                  className={`inline-flex p-3 rounded-lg mb-6 ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  } ${value.color}`}
                >
                  {value.icon}
                </div>
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {value.title}
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className={`py-20 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl lg:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Meet Our Team
            </h2>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              The passionate individuals behind BidHub's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                } hover:shadow-lg transition-shadow`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center bg-no-repeat"></div>
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"
              : "bg-gradient-to-b from-white/95 via-gray-50/90 to-white/95"
          }`}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl lg:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Our Journey
            </h2>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Key milestones in BidHub's growth story
            </p>
          </div>

          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-300"
              }`}
            ></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-xl ${
                        theme === "dark" ? "bg-gray-800/80" : "bg-white/80"
                      } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${
                        theme === "dark" ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3
                        className={`text-lg font-semibold mb-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {milestone.title}
                      </h3>
                      <p
                        className={
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div
                      className={`w-6 h-6 rounded-full ${
                        theme === "dark" ? "bg-blue-500" : "bg-blue-600"
                      } border-4 ${
                        theme === "dark" ? "border-gray-900" : "border-white"
                      } shadow-lg`}
                    ></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-900 to-purple-900"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who trust BidHub for their
            property investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/browse"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}