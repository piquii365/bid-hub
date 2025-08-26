import React, { useEffect, useState } from "react";
import {
  Clock,
  User,
  TrendingUp,
  Crown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Bid } from "../../types";
import { useApp } from "../../context/AppContext";
import { bidsApi } from "../../api";

interface BidHistoryProps {
  propertyId: string;
  bidType: "live" | "sealed" | "fixed";
}

const BidHistory: React.FC<BidHistoryProps> = ({
  propertyId,
  bidType,
}: BidHistoryProps) => {
  const { theme, bids } = useApp();
  // Filter bids for this property and sort by timestamp (newest first)
  const propertyBids = bids
    .filter((bid) => bid.propertyId === propertyId)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  const [testBids, setTestBids] = useState<Bid[]>([]);
  useEffect(() => {
    const fetchTestBids = async () => {
      try {
        const response = await bidsApi.getBids();
        setTestBids(response);
      } catch (error) {
        console.error("Error fetching bid history:", error);
      }
    };

    fetchTestBids();
  }, [propertyId]);
  console.log(testBids);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const bidTime = new Date(timestamp);
    const diffMs = now.getTime() - bidTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getBidStatusColor = (status: string) => {
    switch (status) {
      case "winning":
        return "text-green-600 dark:text-green-400";
      case "outbid":
        return "text-red-600 dark:text-red-400";
      case "won":
        return "text-emerald-600 dark:text-emerald-400";
      case "lost":
        return "text-gray-600 dark:text-gray-400";
      default:
        return theme === "dark" ? "text-gray-300" : "text-gray-600";
    }
  };

  const getBidStatusIcon = (status: string, index: number) => {
    if (index === 0 && status === "winning") {
      return <Crown className="h-4 w-4 text-yellow-500" />;
    }

    switch (status) {
      case "winning":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "outbid":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case "won":
        return <Crown className="h-4 w-4 text-emerald-500" />;
      default:
        return <ArrowUp className="h-4 w-4 text-gray-400" />;
    }
  };

  if (bidType === "sealed") {
    return (
      <div
        className={`rounded-lg border p-6 text-center ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
          <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3
          className={`font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Sealed Bid Auction
        </h3>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Bid history will be revealed when the auction ends. All bids remain
          confidential until then.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3
          className={`font-semibold flex items-center space-x-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <Clock className="h-5 w-5" />
          <span>Bid History</span>
        </h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {propertyBids.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h4
              className={`font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              No Bids Yet
            </h4>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Be the first to place a bid on this property!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {propertyBids.map((bid, index) => (
              <div
                key={bid.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        index === 0
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {getBidStatusIcon(bid.status, index)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {bid.bidderName}
                        </span>
                        {index === 0 && bid.status === "winning" && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Leading
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {formatTimeAgo(bid.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-bold text-lg ${getBidStatusColor(
                        bid.status
                      )}`}
                    >
                      ${bid.amount.toLocaleString()}
                    </div>
                    <div
                      className={`text-xs uppercase tracking-wide font-medium ${getBidStatusColor(
                        bid.status
                      )}`}
                    >
                      {bid.status}
                    </div>
                  </div>
                </div>

                {/* Show bid increment for non-first bids */}
                {index < propertyBids.length - 1 && (
                  <div
                    className={`mt-2 text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    +$
                    {(
                      bid.amount - propertyBids[index + 1].amount
                    ).toLocaleString()}{" "}
                    increase
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {propertyBids.length > 0 && (
        <div
          className={`p-4 border-t border-gray-200 dark:border-gray-700 text-center ${
            theme === "dark" ? "bg-gray-750" : "bg-gray-50"
          }`}
        >
          <p
            className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {bidType === "live"
              ? "Real-time updates"
              : "Updated when bids are placed"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BidHistory;
