import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Heart,
  Share,
  ArrowLeft,
  Gavel,
  User,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import BiddingInterface from "../components/Bidding/BiddingInterface";
import BidHistory from "../components/Bidding/BidHistory";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { properties, theme, biddingRooms, joinBiddingRoom } = useApp();
  const { isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Memoize property and biddingRoom to prevent unnecessary re-renders
  const property = useMemo(
    () => properties.find((p) => p.id === id),
    [properties, id]
  );

  const biddingRoom = useMemo(
    () => (property ? biddingRooms[property.id] : undefined),
    [biddingRooms, property]
  );

  // Memoize joinBiddingRoom callback to prevent infinite useEffect
  const stableJoinBiddingRoom = useCallback(
    (propertyId: string) => {
      joinBiddingRoom(propertyId);
    },
    [joinBiddingRoom]
  );

  useEffect(() => {
    if (property && property.bidType === "live") {
      stableJoinBiddingRoom(property.id);
    }
  }, [property, stableJoinBiddingRoom]);

  // Memoize navigation functions
  const nextImage = useCallback(() => {
    if (!property) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  }, [property]);

  const prevImage = useCallback(() => {
    if (!property) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  }, [property]);

  // Memoize time remaining calculation
  const timeRemaining = useMemo(() => {
    if (!property) return "";

    const now = new Date();
    const endDate = new Date(property.endDate);
    const diffMs = endDate.getTime() - now.getTime();

    if (diffMs <= 0) return "Auction ended";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }, [property]);

  // Memoize type color function
  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case "residential":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "commercial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "land":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "car":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "electronics":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      case "vintage":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  }, []);

  // Memoize watchers count to prevent random regeneration on every render
  const watchersCount = useMemo(() => Math.floor(Math.random() * 50) + 20, []);

  if (!property) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Property Not Found
          </h2>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-center space-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/"
          className={`inline-flex items-center space-x-2 ${
            theme === "dark"
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          } transition-colors`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Properties</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div
              className={`rounded-xl overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-sm`}
            >
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />

                {/* Image Navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    aria-label="Add to favorites"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <button
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    aria-label="Share property"
                  >
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {property.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-blue-500"
                          : theme === "dark"
                          ? "border-gray-600"
                          : "border-gray-200"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <PropertyInfo
              property={property}
              theme={theme}
              getTypeColor={getTypeColor}
              timeRemaining={timeRemaining}
              watchersCount={watchersCount}
            />

            {/* Bid History */}
            <BidHistory propertyId={property.id} bidType={property.bidType} />
          </div>

          {/* Bidding Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {isAuthenticated ? (
                <div
                  className={`rounded-xl p-6 ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } shadow-sm`}
                >
                  <BiddingInterface
                    property={property}
                    biddingRoom={biddingRoom}
                  />
                </div>
              ) : (
                <LoginToBid property={property} theme={theme} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extracted Property Info Component
const PropertyInfo = ({
  property,
  theme,
  getTypeColor,
  timeRemaining,
  watchersCount,
}) => (
  <div
    className={`rounded-xl p-6 ${
      theme === "dark" ? "bg-gray-800" : "bg-white"
    } shadow-sm`}
  >
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center space-x-3 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
              property.type
            )}`}
          >
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              property.status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
        <h1
          className={`text-3xl font-bold mb-3 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {property.title}
        </h1>
        <div
          className={`flex items-center text-lg ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <MapPin className="h-5 w-5 mr-2" />
          {property.location}
        </div>
      </div>

      <div className="text-right">
        <div
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {property.bidType === "fixed" ? "Price" : "Current Bid"}
        </div>
        <div
          className={`text-3xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          ${property.currentPrice.toLocaleString()}
        </div>
        {property.startingPrice !== property.currentPrice && (
          <div
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Starting: ${property.startingPrice.toLocaleString()}
          </div>
        )}
      </div>
    </div>

    <div
      className={`grid grid-cols-3 gap-4 py-4 border-t border-b ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="text-center">
        <div
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {property.totalBids}
        </div>
        <div
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Total Bids
        </div>
      </div>
      <div className="text-center">
        <div
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {watchersCount}
        </div>
        <div
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Watchers
        </div>
      </div>
      <div className="text-center">
        <div
          className={`flex items-center justify-center space-x-1 text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <Clock className="h-5 w-5" />
          <span>{timeRemaining}</span>
        </div>
        <div
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Time Left
        </div>
      </div>
    </div>

    <div className="mt-6">
      <h3
        className={`text-xl font-semibold mb-3 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Description
      </h3>
      <p
        className={`${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        } leading-relaxed`}
      >
        {property.description}
      </p>
    </div>

    {/* Features */}
    {property.features && property.features.length > 0 && (
      <div className="mt-6">
        <h3
          className={`text-xl font-semibold mb-3 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Features
        </h3>
        <div className="flex flex-wrap gap-2">
          {property.features.map((feature: string, index: number) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Specifications */}
    {property.specifications &&
      Object.keys(property.specifications).length > 0 && (
        <div className="mt-6">
          <h3
            className={`text-xl font-semibold mb-3 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(property.specifications).map(([key, value]) => (
              <div
                key={key}
                className={`flex justify-between p-3 rounded-lg ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <span
                  className={`font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {key}:
                </span>
                <span
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    {/* Seller Info */}
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3
        className={`text-xl font-semibold mb-3 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Seller Information
      </h3>
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <User
            className={`h-6 w-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          />
        </div>
        <div>
          <div
            className={`font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {property.sellerName}
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
            <span
              className={`text-sm ml-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              4.9 (127 reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Extracted Login To Bid Component
const LoginToBid = ({ property, theme }) => (
  <div
    className={`rounded-xl p-6 text-center ${
      theme === "dark" ? "bg-gray-800" : "bg-white"
    } shadow-sm`}
  >
    <Gavel
      className={`h-12 w-12 mx-auto mb-4 ${
        theme === "dark" ? "text-gray-400" : "text-gray-500"
      }`}
    />
    <h3
      className={`text-xl font-semibold mb-2 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      Ready to Bid?
    </h3>
    <p
      className={`mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
    >
      Sign in to place bids and join the auction
    </p>
    <Link
      to="/login"
      state={{ from: { pathname: `/property/${property.id}` } }}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
    >
      Sign In to Bid
    </Link>
  </div>
);
