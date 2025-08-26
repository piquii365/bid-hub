import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  TrendingUp,
  Clock,
  Users,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Award,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import PropertyGrid from "../components/Properties/PropertyGrid";
import PropertyFilters from "../components/Properties/PropertyFilters";

const Home: React.FC = () => {
  const { properties, theme } = useApp();
  const [filters, setFilters] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  const featuredProperties = properties.slice(0, 6);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      if (
        filters.search &&
        !property.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !property.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) &&
        !property.location.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Type filter
      if (filters.type && property.type !== filters.type) {
        return false;
      }

      // Bid type filter
      if (filters.bidType && property.bidType !== filters.bidType) {
        return false;
      }

      // Status filter
      if (filters.status && property.status !== filters.status) {
        return false;
      }

      // Price range filter - FIXED: Added proper null checks
      if (filters.priceRange) {
        const minPrice = parseFloat(filters.priceRange.min || "0");
        const maxPrice = parseFloat(filters.priceRange.max || "1000000000"); // Use a large default max

        if (minPrice && property.currentPrice < minPrice) {
          return false;
        }
        if (maxPrice && property.currentPrice > maxPrice) {
          return false;
        }
      }

      // Location filter
      if (
        filters.location &&
        !property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  const stats = [
    {
      label: "Active Auctions",
      value: properties.filter((p) => p.status === "active").length,
      icon: <Clock className="h-6 w-6" />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      label: "Total Bids Today",
      value: "247",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: "Active Bidders",
      value: "1,234",
      icon: <Users className="h-6 w-6" />,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      label: "Success Rate",
      value: "94%",
      icon: <Award className="h-6 w-6" />,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-Time Bidding",
      description:
        "Experience live auctions with instant bid updates and notifications",
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Transactions",
      description:
        "Your bids and payments are protected with enterprise-grade security",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Diverse Properties",
      description:
        "From real estate to vintage collectibles, find unique items to bid on",
      color: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      {/* Hero Section */}
      <section className={`relative py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('/property-with-land.jpeg')] bg-cover bg-center bg-no-repeat z-0"></div>
        <div className={`absolute inset-0 z-0 bg-black/60 `}></div>
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-2">
          <div className="text-center">
            <h1
              className={`text-5xl lg:text-6xl font-bold mb-6 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Discover Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Great Investment
              </span>
            </h1>
            <p
              className={`text-xl mb-8 max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-200"
              }`}
            >
              Join thousands of bidders and sellers in the most trusted property
              bidding platform. From luxury real estate to rare collectibles,
              find opportunities that match your interests.
            </p>

            {/* Quick Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search properties, cars, electronics..."
                  className={`w-full pl-12 pr-32 py-4 rounded-2xl border-2 text-lg transition-colors ${
                    theme === "dark"
                      ? "bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-white/90 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Start Bidding</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/browse"
                className={`px-8 py-4 rounded-xl font-semibold border-2 transition-colors ${
                  theme === "dark"
                    ? "border-gray-600 text-white hover:bg-gray-800/30"
                    : "border-gray-300 text-white/90 hover:bg-white/80"
                }`}
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-sm hover:shadow-md transition-shadow`}
              >
                <div
                  className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.color} flex items-center justify-center mb-4`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-2xl font-bold mb-1 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
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

      {/* Features Section */}
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
              Why Choose BidHub?
            </h2>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              We provide the most advanced and secure platform for property
              bidding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-xl ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                } hover:shadow-lg transition-shadow`}
              >
                <div
                  className={`inline-flex p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-600" : "bg-white"
                  } ${feature.color} mb-6`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2
                className={`text-3xl lg:text-4xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Featured Auctions
              </h2>
              <p
                className={`text-xl ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Discover trending properties and hot deals
              </p>
            </div>
            <Link
              to="/browse"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <PropertyGrid properties={featuredProperties} />
        </div>
      </section>

      {/* Browse Section */}
      <section
        className={`py-20 ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className={`text-3xl lg:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Browse All Properties
            </h2>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Use our advanced filters to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <PropertyFilters onFiltersChange={setFilters} />
            </div>
            <div className="lg:col-span-3">
              <div
                className={`mb-6 flex items-center justify-between ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <span>{filteredProperties.length} properties found</span>
                <select
                  title="Sort properties"
                  className={`px-3 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option>Sort by: Most Recent</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Ending Soon</option>
                </select>
              </div>
              <PropertyGrid properties={filteredProperties} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
