import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../components/useFetch";

export default function Header() {
  const user = useFetch("/users/myuser", "GET");

  return (
    <>
      <header>
        <div className="header-user-card">
          <Link to="/">
            <img
              className="header-picture"
              src={user.profilePicPath}
              alt={user.name}
            />
          </Link>
          <Link to="/">
            <p>
              <b>{user.name}</b>
            </p>
          </Link>
        </div>
        <div className="header-right-pane">
          <Link to="/logout">
            <p>Sair</p>
          </Link>
        </div>
      </header>
    </>
  );
}
