import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import jwt_decode from "jwt-decode";

export default function App() {
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    try {
      jwt_decode(localStorage.getItem("jwt"), { header: true });
      setAuthed(true);
    } catch (err) {
      console.log(err);
      setAuthed(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={authed ? <HomePage /> : <RegisterPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
