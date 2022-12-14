import React from "react";
import AnyUserProfile from "../AnyUser/AnyUserProfile";
import AnyUserFeed from "./AnyUserFeed";
import CardsPanel from "../../components/CardsPanel/CardsPanel";
import { useParams } from "react-router-dom";

export const anyUserContext = React.createContext();

export default function UserPage() {
  const { userId } = useParams();
  const [anyUser, setAnyUser] = React.useState({});

  React.useEffect(() => {
    fetch(`/users/read/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAnyUser(data);
      });
  });

  return (
    <anyUserContext.Provider value={anyUser}>
      <div className="homepage-flex-container fade-in">
        <AnyUserProfile />
        <AnyUserFeed />
        <CardsPanel />
      </div>
    </anyUserContext.Provider>
  );
}
