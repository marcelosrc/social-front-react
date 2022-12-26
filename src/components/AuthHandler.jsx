import React from "react";
import { Navigate } from "react-router-dom";

export const HandleLogout = () => {
  localStorage.removeItem("jwt");
  return <Navigate to="/login" />;
};

export const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("jwt")) {
    return <Navigate to="/login" />;
  }
  return children;
};
