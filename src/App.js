import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import UserPage from "./pages/User/UserPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import jwt_decode from "jwt-decode";

import "./styles/main.css";
import "./styles/login.css";
import "./styles/home.css";
import "./styles/register.css";

export default function App() {
  const ProtectedRoute = ({ children }) => {
    try {
      jwt_decode(localStorage.getItem("jwt"), { header: true });
      return children;
    } catch {
      return <Navigate to="/login" />;
    }
  };

  const HandleLogout = () => {
    localStorage.removeItem("jwt");
    return <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="users/:userId"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<HandleLogout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
