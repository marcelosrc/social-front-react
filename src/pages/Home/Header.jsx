import React from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      <header>
        <div className="header-left">
          <img width="50px" height="50px" src={logo} alt="Home" />
        </div>
        <div className="header-right">
          <p onClick={handleLogout}>Sair</p>
        </div>
      </header>
    </>
  );
}
