import React from "react";
import { UserContext } from "../Home/HomePage";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = React.useContext(UserContext);

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
          <p>
              <b>R${user.score},00</b>
            </p>
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
