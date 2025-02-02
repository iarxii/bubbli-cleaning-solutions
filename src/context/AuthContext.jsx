import React, { createContext, useState, useEffect } from "react";
// import decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("DEBUG::.[useEffect]Decoded JWT in AuthContext:", decoded);
        setUser(decoded);
      } catch (err) {
        console.error("Error decoding JWT:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    console.log("DEBUG::.[login()]Decoded JWT in AuthContext:", decoded);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    console.log("Token removed - logout")
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; // Export separately
