import React from "react";
import Header from "./Header";

export const userContext = React.createContext({});

export default function HomePage(props) {
  const [user, setUser] = React.useState({});
  const [reloadUser, setReloadUser] = React.useState(false);

  React.useEffect(() => {
    fetch("/users/myuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setReloadUser(false);
      });
  }, [reloadUser]);

  return (
    <>
      <userContext.Provider value={{ user, setReloadUser }}>
        <Header />
        {props.page}
      </userContext.Provider>
    </>
  );
}
