import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import UserPage from "./pages/User/UserPage";
import AnyUserPage from "./pages/AnyUser/AnyUserPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

import "./styles/main.css";
import "./styles/login.css";
import "./styles/home.css";
import "./styles/register.css";

export default function App() {
  const HandleLogout = () => {
    localStorage.removeItem("jwt");
    return <Navigate to="/login" />;
  };

  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("jwt")) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage page={<UserPage />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="users/:userId"
          element={
            <ProtectedRoute>
              <HomePage page={<AnyUserPage />} />
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
