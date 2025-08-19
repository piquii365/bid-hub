// Core application types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'bidder' | 'seller' | 'admin';
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'residential' | 'commercial' | 'land' | 'car' | 'electronics' | 'vintage';
  images: string[];
  location: string;
  startingPrice: number;
  currentPrice: number;
  bidType: 'live' | 'sealed' | 'fixed';
  status: 'active' | 'sold' | 'expired' | 'pending';
  sellerId: string;
  sellerName: string;
  endDate: string;
  createdAt: string;
  totalBids: number;
  features?: string[];
  specifications?: Record<string, string>;
}

export interface Bid {
  id: string;
  propertyId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
  type: 'live' | 'sealed' | 'fixed';
  status: 'active' | 'winning' | 'outbid' | 'won' | 'lost';
}

export interface BiddingRoom {
  propertyId: string;
  participants: number;
  highestBid: number;
  timeRemaining: number;
  isActive: boolean;
}

export interface Notification {
  id: string;
  type: 'bid_placed' | 'outbid' | 'won' | 'sold' | 'ending_soon';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  propertyId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface AppState {
  properties: Property[];
  bids: Bid[];
  notifications: Notification[];
  biddingRooms: Record<string, BiddingRoom>;
  theme: 'light' | 'dark';
  loading: boolean;
  error: string | null;
}