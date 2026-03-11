import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isMockMode: boolean;
  login: () => void;
  logout: () => void;
  toggleMockMode: () => void;
  setMockMode: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMockMode, setIsMockModeState] = useState(() => {
    return localStorage.getItem("brandpilot-mock-mode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("brandpilot-mock-mode", String(isMockMode));
  }, [isMockMode]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const toggleMockMode = () => setIsMockModeState((prev) => !prev);
  const setMockMode = (value: boolean) => setIsMockModeState(value);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isMockMode, login, logout, toggleMockMode, setMockMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
