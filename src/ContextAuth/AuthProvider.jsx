import React, {
  createContext,
  useContext,
  useState,
} from "react";

import api from "../api/axiosInstance";

// ========================================
// Create Context
// ========================================

const AuthContext = createContext(null);

// ========================================
// LocalStorage Keys
// ========================================

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "accessToken";

// ========================================
// Get Initial User
// ========================================

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem(
      USER_STORAGE_KEY
    );

    if (
      !stored ||
      stored === "undefined" ||
      stored === "null"
    ) {
      return null;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error(
      "Failed to read user from localStorage:",
      error
    );

    return null;
  }
};

// ========================================
// Auth Provider
// ========================================

const AuthProvider = ({ children }) => {
  // ======================================
  // User State
  // ======================================

  const [user, setUser] = useState(getInitialUser);

  // ======================================
  // Access Token State
  // ======================================

  const [accessToken, setAccessToken] = useState(() => {
    return (
      localStorage.getItem(TOKEN_STORAGE_KEY) ||
      null
    );
  });

  // ========================================
  // LOGIN
  // ========================================

  const login = (userData, token) => {
    if (!userData) {
      console.error(
        "login() called with no user data. Check your API response."
      );

      return;
    }

    // Save user in React state
    setUser(userData);

    // Save user in localStorage
    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(userData)
    );

    // Save access token
    if (token) {
      setAccessToken(token);

      localStorage.setItem(
        TOKEN_STORAGE_KEY,
        token
      );
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "Logout API error:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );
    } finally {
      // Clear React state
      setUser(null);
      setAccessToken(null);

      // Clear localStorage
      localStorage.removeItem(
        USER_STORAGE_KEY
      );

      localStorage.removeItem(
        TOKEN_STORAGE_KEY
      );

      
    }
  };

  // ========================================
  // Provider
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ========================================
// Custom useAuth Hook
// ========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};

// ========================================
// Export Provider
// ========================================

export default AuthProvider;