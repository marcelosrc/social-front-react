import React from "react";
import { Link } from "react-router-dom";
import { userContext } from "./HomePage";

export default function Header() {
  const { user } = React.useContext(userContext);

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
