import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, HandleLogout } from "./components/AuthHandler";
import HomePage from "./pages/Home/HomePage";
import UserPage from "./pages/User/UserPage";
import AnyUserPage from "./pages/AnyUser/AnyUserPage";
import AnyUserFollowingGridPage from "./pages/AnyUser/AnyUserFollowingGridPage";
import AnyUserFollowersGridPage from "./pages/AnyUser/AnyUserFollowersGridPage";
import AnyUserFeed from "./pages/AnyUser/AnyUserFeed";
import AnyUserPost from "./pages/AnyUser/AnyUserPost";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

import "./styles/main.css";
import "./styles/login.css";
import "./styles/home.css";
import "./styles/anyprofile.css";
import "./styles/grid.css";
import "./styles/postpage.css";
import "./styles/peoplecards.css";
import "./styles/register.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<UserPage />} />
          <Route path=":userId" element={<AnyUserPage />}>
            <Route path="" element={<AnyUserFeed />} />
            <Route path=":postId" element={<AnyUserPost />} />
          </Route>
          <Route
            path=":userId/following"
            element={<AnyUserFollowingGridPage />}
          />
          <Route
            path=":userId/followers"
            element={<AnyUserFollowersGridPage />}
          />
        </Route>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<HandleLogout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
