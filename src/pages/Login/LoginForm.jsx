import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [currentUser, setCurrentUser] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          navigate("/");
        } else {
          console.log("TEM QUE TRATAR ESSE ERRO AQUI");
        }
      });
  };

  return (
    <>
      <div className="loginpage-right-pane">
        <form className="loginpage-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="standard-input"
            name="email"
            type="text"
            value={currentUser.email}
            onChange={handleChange}
          />
          <label>Senha</label>
          <input
            className="standard-input"
            name="password"
            type="password"
            value={currentUser.password}
            onChange={handleChange}
          />
          <Link to="/register">
            <small>Criar nova conta</small>
          </Link>
          <button className="standard-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
