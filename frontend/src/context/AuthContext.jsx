// src/context/AuthContext.jsx


import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // important

  // Load user on refresh
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = (data) => {
    // assuming backend sends { user, token }
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    setUser(data.user);
  };

  // Logout function
 const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
};
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};