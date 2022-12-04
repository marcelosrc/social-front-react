import React from "react";
import logo from "../../images/logo.png";

export default function Header() {
  return (
    <>
      <header>
        <div className="header-left">
          <img width="50px" height="50px" src={logo} alt="Home" />
        </div>
        <div className="header-right">
          <p>Sair</p>
        </div>
      </header>
    </>
  );
}
