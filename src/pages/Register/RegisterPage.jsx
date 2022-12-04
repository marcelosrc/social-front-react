import React from "react";

export default function RegisterPage() {
  const [newUser, setNewUser] = React.useState({
    profilePic: "",
    email: "",
    name: "",
    surname: "",
    dob: "",
    password: "",
  });

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.files[0] });
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
      .then((data) => alert(data.message))
      .catch((err) => alert(err));
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="profilePic">Foto</label>
        <br />
        <input type="file" name="profilePic" onChange={handleFileChange} />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="standard-input"
          name="email"
          type="text"
          value={newUser.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="name">Nome</label>
        <br />
        <input
          className="standard-input"
          name="name"
          type="text"
          value={newUser.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="surname">Sobrenome</label>
        <br />
        <input
          className="standard-input"
          name="surname"
          type="text"
          value={newUser.surname}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="dob">Data de Nascimento</label>
        <br />
        <input
          className="standard-input"
          name="dob"
          type="date"
          value={newUser.dob}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Senha</label>
        <br />
        <input
          className="standard-input"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button className="standard-button" type="submit">
          Criar
        </button>
        <br />
        <br />
      </form>
      <button className="standard-button">
        Voltar
      </button>
    </div>
  );
}
