import React, { useState, useEffect, useCallback } from "react";
import {
  Timer,
  Users,
  DollarSign,
  ArrowUp,
  AlertCircle,
  Gavel,
  TrendingUp,
  Lock,
  ShoppingCart,
} from "lucide-react";
import { Property, BiddingRoom } from "../../types";
import { useApp } from "../../context/AppContext";

interface BiddingInterfaceProps {
  property: Property;
  biddingRoom?: BiddingRoom;
}

export default function BiddingInterface({
  property,
  biddingRoom,
}: BiddingInterfaceProps) {
  const { theme, placeBid, joinBiddingRoom } = useApp();
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  const minBidIncrement = 100;
  const suggestedBid = property.currentPrice + minBidIncrement;

  useEffect(() => {
    // Auto-join live auctions when component mounts
    if (property.bidType === "live" && !hasJoined) {
      joinBiddingRoom(property.id);
      setHasJoined(true);
    }
  }, [property.id, property.bidType, hasJoined]);

  // Memoize formatTime to prevent recreation on every render
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const amount = parseFloat(bidAmount);

    // Validation
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid bid amount");
      setIsSubmitting(false);
      return;
    }

    if (amount <= property.currentPrice) {
      setError(
        `Bid must be higher than current price of $${property.currentPrice.toLocaleString()}`
      );
      setIsSubmitting(false);
      return;
    }

    if (property.bidType === "live" && amount < suggestedBid) {
      setError(
        `Minimum bid increment is $${minBidIncrement}. Suggested bid: $${suggestedBid.toLocaleString()}`
      );
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      placeBid(property.id, amount);
      setBidAmount("");
    } catch (err) {
      setError("Failed to place bid. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickBid = useCallback((amount: number) => {
    setBidAmount(amount.toString());
  }, []);

  // Memoize bid type config to prevent recreation
  const config = React.useMemo(() => {
    switch (property.bidType) {
      case "live":
        return {
          title: "Live Auction",
          icon: <Gavel className="h-5 w-5" />,
          color: "text-red-500",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-800",
          buttonColor: "bg-red-600 hover:bg-red-700",
          description: "Real-time bidding with instant updates",
        };
      case "sealed":
        return {
          title: "Sealed Bid",
          icon: <Lock className="h-5 w-5" />,
          color: "text-yellow-500",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          buttonColor: "bg-yellow-600 hover:bg-yellow-700",
          description: "Your bid is private until the auction ends",
        };
      case "fixed":
        return {
          title: "Buy Now",
          icon: <ShoppingCart className="h-5 w-5" />,
          color: "text-blue-500",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
          description: "Purchase immediately at the listed price",
        };
      default:
        return {
          title: "Bidding",
          icon: <Gavel className="h-5 w-5" />,
          color: "text-gray-500",
          bgColor: "bg-gray-50 dark:bg-gray-800",
          borderColor: "border-gray-200 dark:border-gray-700",
          buttonColor: "bg-gray-600 hover:bg-gray-700",
          description: "Place your bid",
        };
    }
  }, [property.bidType]);

  // Memoize quick bid amounts
  const quickBidAmounts = React.useMemo(
    () => [suggestedBid, suggestedBid + 500, suggestedBid + 1000],
    [suggestedBid]
  );
  return (
    <div
      className={`space-y-6 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      {/* Bidding Type Header */}
      <div
        className={`rounded-lg p-4 ${config.bgColor} border ${config.borderColor}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className={config.color}>{config.icon}</span>
            <h3 className="font-semibold">{config.title}</h3>
          </div>
          {property.status === "active" && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
              Active
            </span>
          )}
        </div>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {config.description}
        </p>
      </div>

      {/* Live Auction Stats */}
      {property.bidType === "live" && biddingRoom && (
        <div className="grid grid-cols-3 gap-4">
          <div
            className={`p-3 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Timer
                className={`h-4 w-4 ${
                  biddingRoom.timeRemaining < 300
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              />
              <span className="text-sm font-medium">Time Left</span>
            </div>
            <div
              className={`text-lg font-bold ${
                biddingRoom.timeRemaining < 300 ? "text-red-500" : ""
              }`}
            >
              {formatTime(biddingRoom.timeRemaining)}
            </div>
          </div>

          <div
            className={`p-3 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Users className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Participants</span>
            </div>
            <div className="text-lg font-bold">{biddingRoom.participants}</div>
          </div>

          <div
            className={`p-3 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Total Bids</span>
            </div>
            <div className="text-lg font-bold">{property.totalBids}</div>
          </div>
        </div>
      )}

      {/* Current Price */}
      <div
        className={`p-4 rounded-lg border ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {property.bidType === "fixed" ? "Price" : "Current Highest Bid"}
          </span>
          {property.currentPrice > property.startingPrice &&
            property.bidType !== "fixed" && (
              <div className="flex items-center space-x-1 text-green-500">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm">
                  +$
                  {(
                    property.currentPrice - property.startingPrice
                  ).toLocaleString()}
                </span>
              </div>
            )}
        </div>
        <div className="text-3xl font-bold">
          ${property.currentPrice.toLocaleString()}
        </div>
        {property.bidType !== "fixed" &&
          property.startingPrice !== property.currentPrice && (
            <div
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Starting price: ${property.startingPrice.toLocaleString()}
            </div>
          )}
      </div>

      {/* Quick Bid Buttons */}
      {property.bidType === "live" && property.status === "active" && (
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Quick Bid Options
          </label>
          <div className="grid grid-cols-3 gap-2">
            {quickBidAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickBid(amount)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700"
                }`}
              >
                ${amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bid Form */}
      {property.status === "active" && (
        <form onSubmit={handleSubmitBid} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {property.bidType === "fixed"
                ? "Purchase Amount"
                : "Your Bid Amount"}
            </label>
            <div className="relative">
              <DollarSign
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={
                  property.bidType === "fixed"
                    ? property.currentPrice.toString()
                    : suggestedBid.toString()
                }
                className={`w-full pl-10 pr-4 py-3 rounded-lg border text-lg font-medium transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                min={
                  property.bidType === "fixed"
                    ? property.currentPrice
                    : property.currentPrice + 1
                }
                step="1"
                required
              />
            </div>
            {property.bidType !== "fixed" && (
              <p
                className={`text-xs mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Minimum bid: ${suggestedBid.toLocaleString()}
              </p>
            )}
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || property.status !== "active"}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${config.buttonColor} text-white flex items-center justify-center space-x-2`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>
                  Placing {property.bidType === "fixed" ? "Order" : "Bid"}...
                </span>
              </>
            ) : (
              <>
                {config.icon}
                <span>
                  {property.bidType === "fixed"
                    ? "Buy Now"
                    : property.bidType === "sealed"
                    ? "Place Sealed Bid"
                    : "Place Bid"}
                </span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Auction Ended */}
      {property.status !== "active" && (
        <div
          className={`p-4 rounded-lg text-center ${
            property.status === "sold"
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          }`}
        >
          <h3
            className={`font-semibold mb-2 ${
              property.status === "sold"
                ? "text-green-800 dark:text-green-200"
                : theme === "dark"
                ? "text-gray-200"
                : "text-gray-800"
            }`}
          >
            {property.status === "sold" ? "Auction Completed" : "Auction Ended"}
          </h3>
          <p
            className={`text-sm ${
              property.status === "sold"
                ? "text-green-600 dark:text-green-300"
                : theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {property.status === "sold"
              ? `Winning bid: $${property.currentPrice.toLocaleString()}`
              : "This auction has ended without a sale"}
          </p>
        </div>
      )}
    </div>
  );
}
