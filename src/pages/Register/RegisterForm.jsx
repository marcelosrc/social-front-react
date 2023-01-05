import React from "react";
import { useNavigate } from "react-router-dom";
import PictureWindow from "./PictureWindow";

export default function RegisterForm() {
  const [pictureWindow, setPictureWindow] = React.useState(false);
  const [newUser, setNewUser] = React.useState({
    profilePic: "",
    email: "",
    name: "",
    surname: "",
    dob: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("profilePic", newUser.profilePic);
    formData.append("email", newUser.email);
    formData.append("name", newUser.name);
    formData.append("surname", newUser.surname);
    formData.append("dob", newUser.dob);
    formData.append("password", newUser.password);
    fetch("/users/create", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate("/login");
      });
  };

  const showPictureWindow = () => {
    console.log(pictureWindow);
    setPictureWindow(true);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="registerpage-right-pane">
      {pictureWindow ? (
        <PictureWindow newUser={newUser} setNewUser={setNewUser} />
      ) : (
        <></>
      )}
      <button className="standard-button" onClick={showPictureWindow}>
        Foto
      </button>
      <form className="registerpage-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="standard-input"
          name="email"
          type="text"
          value={newUser.email}
          onChange={handleChange}
        />
        <label htmlFor="name">Nome</label>
        <input
          className="standard-input"
          name="name"
          type="text"
          value={newUser.name}
          onChange={handleChange}
        />
        <label htmlFor="surname">Sobrenome</label>
        <input
          className="standard-input"
          name="surname"
          type="text"
          value={newUser.surname}
          onChange={handleChange}
        />
        <label htmlFor="dob">Data de Nascimento</label>
        <input
          className="standard-input"
          name="dob"
          type="date"
          value={newUser.dob}
          onChange={handleChange}
        />
        <label htmlFor="password">Senha</label>
        <input
          className="standard-input"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <button className="standard-button" type="submit">
          Criar
        </button>
      </form>
      <button className="standard-button" onClick={navigateToLogin}>
        Voltar
      </button>
    </div>
  );
}
