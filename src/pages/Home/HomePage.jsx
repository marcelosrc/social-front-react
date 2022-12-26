import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export const UserContext = React.createContext({});

export default function HomePage() {
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
      <UserContext.Provider value={{ user, setReloadUser }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}
