import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import "./styles/peoplecards.css";
import "./styles/register.css";

export const AuthContext = React.createContext({});

export default function App() {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    fetch("/users/myuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

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
      <AuthContext.Provider value={user}>
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
            path="following"
            element={
              <ProtectedRoute>
                <HomePage page={<UserFollowingGridPage />} />
              </ProtectedRoute>
            }
          />
          <Route
            path="followers"
            element={
              <ProtectedRoute>
                <HomePage page={<UserFollowersGridPage />} />
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
          <Route
            path="users/:userId/following"
            element={
              <ProtectedRoute>
                <HomePage page={<AnyUserFollowingGridPage />} />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/:userId/followers"
            element={
              <ProtectedRoute>
                <HomePage page={<AnyUserFollowersGridPage />} />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/:postId"
            element={
              <ProtectedRoute>
                <HomePage page={<PostPage />} />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<HandleLogout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>{" "}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
