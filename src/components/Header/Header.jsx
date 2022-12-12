import React from "react";
import { useNavigate, Link } from "react-router-dom";

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
          <Link to="/">
            <img width="50px" height="50px" src="#" alt="Home" />
          </Link>
        </div>
        <div className="header-right">
          <p onClick={handleLogout}>Sair</p>
        </div>
      </header>
    </>
  );
}
