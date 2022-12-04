import React from "react";

export default function LoginForm() {
  const [greetings, setGreetings] = React.useState("Bom dia");
  const [currentUser, setCurrentUser] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    const date = new Date();
    if (date.getHours() >= 19) {
      setGreetings("Boa noite");
    } else if (date.getHours() >= 12 && date.getHours() < 19) {
      setGreetings("Boa tarde");
    }
  }, []);

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
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="rightside">
      <form className="rightside-pane" onSubmit={handleSubmit}>
        <h2>{greetings}</h2>
        <br />
        <label>Email</label>
        <input
          className="standard-input"
          name="email"
          type="text"
          value={currentUser.email}
          onChange={handleChange}
        />
        <br />
        <label>Senha</label>
        <input
          className="standard-input"
          name="password"
          type="password"
          value={currentUser.password}
          onChange={handleChange}
        />
        <br />
        <button className="standard-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
