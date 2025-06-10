import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Recipes from "@/pages/Recipes";
import Ingredients from "@/pages/Ingredients";
import Settings from "@/pages/Settings";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AuthContext.Provider>
  );
}
