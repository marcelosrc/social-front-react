import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <>
      <header>
        <div className="header-left">
          <Link to="/">
            <img
              className="header-picture"
              src={props.currentUser.profilePicPath}
              alt={props.currentUser.name}
            />
          </Link>
          <Link to="/">
            <p>
              <b>{props.currentUser.name}</b>
            </p>
          </Link>
        </div>
        <div className="header-right">
          <Link to="/logout">
            <p>Sair</p>
          </Link>
        </div>
      </header>
    </>
  );
}
