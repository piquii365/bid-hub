import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { AuthState, User } from "../types";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase-config";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: "bidder" | "seller"
  ) => Promise<void>;
  logout: () => void;
}

type AuthAction =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "LOGOUT":
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
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: "SET_USER", payload: user });
      } catch (error) {
        console.error("Error parsing saved user:", error);
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      role: "bidder",
      avatar: `https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150`,
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("user", JSON.stringify(mockUser));
    dispatch({ type: "SET_USER", payload: mockUser });
  };

  const loginWithGoogle = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    signInWithPopup(auth, provider)
      .then(async ({ user }) => {
        const currentUser: User = {
          id: user.uid,
          email: user.email || "",
          name: user.displayName || "Anonymous",
          role: "bidder",
          accessToken: await user.getIdToken(),
          avatar:
            user.photoURL ||
            `https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150`,
          createdAt: new Date().toISOString(),
        };
        sessionStorage.setItem("user", JSON.stringify(currentUser));
        dispatch({ type: "SET_USER", payload: currentUser });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: "bidder" | "seller"
  ) => {
    dispatch({ type: "SET_LOADING", payload: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      avatar: `https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150`,
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("user", JSON.stringify(mockUser));
    dispatch({ type: "SET_USER", payload: mockUser });
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
