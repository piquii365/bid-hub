import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Property, Bid, Notification, BiddingRoom } from '../types';
import { mockProperties, mockBids, mockNotifications } from '../data/mockData';

interface AppContextType extends AppState {
  dispatch: React.Dispatch<AppAction>;
  placeBid: (propertyId: string, amount: number) => void;
  joinBiddingRoom: (propertyId: string) => void;
  leaveBiddingRoom: (propertyId: string) => void;
  toggleTheme: () => void;
  markNotificationRead: (notificationId: string) => void;
}

type AppAction =
  | { type: 'SET_PROPERTIES'; payload: Property[] }
  | { type: 'ADD_PROPERTY'; payload: Property }
  | { type: 'UPDATE_PROPERTY'; payload: Property }
  | { type: 'ADD_BID'; payload: Bid }
  | { type: 'UPDATE_BID'; payload: Bid }
  | { type: 'SET_BIDDING_ROOM'; payload: { propertyId: string; room: BiddingRoom } }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  properties: mockProperties,
  bids: mockBids,
  notifications: mockNotifications,
  biddingRooms: {},
  theme: 'light',
  loading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    
    case 'ADD_PROPERTY':
      return { ...state, properties: [...state.properties, action.payload] };
    
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        properties: state.properties.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    
    case 'ADD_BID':
      return { ...state, bids: [...state.bids, action.payload] };
    
    case 'UPDATE_BID':
      return {
        ...state,
        bids: state.bids.map(b => 
          b.id === action.payload.id ? action.payload : b
        )
      };
    
    case 'SET_BIDDING_ROOM':
      return {
        ...state,
        biddingRooms: {
          ...state.biddingRooms,
          [action.payload.propertyId]: action.payload.room
        }
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate bidding room updates
      Object.keys(state.biddingRooms).forEach(propertyId => {
        const room = state.biddingRooms[propertyId];
        if (room.isActive && room.timeRemaining > 0) {
          dispatch({
            type: 'SET_BIDDING_ROOM',
            payload: {
              propertyId,
              room: {
                ...room,
                timeRemaining: room.timeRemaining - 1
              }
            }
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.biddingRooms]);

  const placeBid = (propertyId: string, amount: number) => {
    const property = state.properties.find(p => p.id === propertyId);
    if (!property) return;

    const newBid: Bid = {
      id: Date.now().toString(),
      propertyId,
      bidderId: 'current-user',
      bidderName: 'Current User',
      amount,
      timestamp: new Date().toISOString(),
      type: property.bidType,
      status: 'winning'
    };

    dispatch({ type: 'ADD_BID', payload: newBid });
    
    // Update property current price
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: {
        ...property,
        currentPrice: amount,
        totalBids: property.totalBids + 1
      }
    });

    // Add notification
    const notification: Notification = {
      id: Date.now().toString(),
      type: 'bid_placed',
      title: 'Bid Placed Successfully',
      message: `Your bid of $${amount.toLocaleString()} on ${property.title} has been placed.`,
      timestamp: new Date().toISOString(),
      read: false,
      propertyId
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const joinBiddingRoom = (propertyId: string) => {
    const property = state.properties.find(p => p.id === propertyId);
    if (!property) return;

    const room: BiddingRoom = {
      propertyId,
      participants: Math.floor(Math.random() * 20) + 5,
      highestBid: property.currentPrice,
      timeRemaining: Math.floor(Math.random() * 3600) + 300,
      isActive: true
    };

    dispatch({ type: 'SET_BIDDING_ROOM', payload: { propertyId, room } });
  };

  const leaveBiddingRoom = (propertyId: string) => {
    const room = state.biddingRooms[propertyId];
    if (room) {
      dispatch({
        type: 'SET_BIDDING_ROOM',
        payload: {
          propertyId,
          room: { ...room, isActive: false }
        }
      });
    }
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const markNotificationRead = (notificationId: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
      placeBid,
      joinBiddingRoom,
      leaveBiddingRoom,
      toggleTheme,
      markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}