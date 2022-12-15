import React from "react";
import Header from "./Header";

export const userContext = React.createContext({});

export default function HomePage(props) {
  const [user, setUser] = React.useState({});

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
      });
  }, []);

  return (
    <>
      <userContext.Provider value={user}>
        <Header />
        {props.page}
      </userContext.Provider>
    </>
  );
}
