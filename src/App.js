import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, HandleLogout } from "./components/AuthHandler";
import HomePage from "./pages/Home/HomePage";
import UserPage from "./pages/User/UserPage";
import UserFollowingGridPage from "./pages/User/UserFollowingGridPage";
import UserFollowersGridPage from "./pages/User/UserFollowersGridPage";
import AnyUserPage from "./pages/AnyUser/AnyUserPage";
import AnyUserFollowingGridPage from "./pages/AnyUser/AnyUserFollowingGridPage";
import AnyUserFollowersGridPage from "./pages/AnyUser/AnyUserFollowersGridPage";
import PostPage from "./pages/Post/PostPage";
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
      <ProtectedRoute>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<UserPage />} />
            <Route path="following" element={<UserFollowingGridPage />} />
            <Route path="followers" element={<UserFollowersGridPage />} />
            <Route path="users/:userId" element={<AnyUserPage />} />
            <Route
              path="users/:userId/following"
              element={<AnyUserFollowingGridPage />}
            />
            <Route
              path="users/:userId/followers"
              element={<AnyUserFollowersGridPage />}
            />
            <Route path="posts/:postId" element={<PostPage />} />
          </Route>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<HandleLogout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProtectedRoute>
    </BrowserRouter>
  );
}
