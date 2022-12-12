import React from "react";
import { useNavigate, Link } from "react-router-dom";
import formatError from "../../components/formatError";

export default function LoginForm() {
  const [currentUser, setCurrentUser] = React.useState({
    email: "",
    password: "",
  });
  const [errorAlert, setErrorAlert] = React.useState(null);
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
          setErrorAlert(data.message);
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
          {formatError(errorAlert, "small")}
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
