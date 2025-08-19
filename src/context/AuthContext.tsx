import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string, role: 'bidder' | 'seller') => Promise<void>;
  logout: () => void;
}

type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'bidder',
      avatar: `https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    dispatch({ type: 'SET_USER', payload: mockUser });
  };

  const loginWithGoogle = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockUser: User = {
      id: 'google-1',
      email: 'user@gmail.com',
      name: 'John Doe',
      role: 'bidder',
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    dispatch({ type: 'SET_USER', payload: mockUser });
  };

  const register = async (email: string, password: string, name: string, role: 'bidder' | 'seller') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      avatar: `https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    dispatch({ type: 'SET_USER', payload: mockUser });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      loginWithGoogle,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}