import React from "react";
import { Outlet, useParams } from "react-router-dom";
import CardsPanel from "../../components/CardsPanel/CardsPanel";
import AnyUserProfile from "../AnyUser/AnyUserProfile";

export const AnyUserContext = React.createContext({});

export default function AnyUserPage() {
  const routerIdParam = useParams();
  const [anyUser, setAnyUser] = React.useState({});
  const [reloadAnyUser, setReloadAnyUser] = React.useState(false);

  React.useEffect(() => {
    fetch("/users/read/" + routerIdParam.userId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAnyUser(data);
        setReloadAnyUser(false);
      });
  }, [reloadAnyUser, routerIdParam.userId]);

  return (
    <AnyUserContext.Provider value={{ anyUser, setReloadAnyUser }}>
      <div className="homepage-flex-container">
        <AnyUserProfile />
        <Outlet />
        <CardsPanel />
      </div>
    </AnyUserContext.Provider>
  );
}
