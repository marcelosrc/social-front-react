import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import NoMatchPage from "./pages/NoMatch/NoMatchPage";

export const AuthContext = React.createContext(null);

export default function App() {
  const webtoken = localStorage.getItem("jwt");

  const ProtectedRoute = ({ children }) => {
    console.log("2 -", webtoken)
    if (!webtoken) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  return (
    <AuthContext.Provider value={webtoken}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
