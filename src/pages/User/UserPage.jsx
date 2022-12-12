import React from "react";
import Header from "../Header/Header";
import UserStatus from "../../components/UserStatus";
import UserFeed from "./UserFeed";
import CardsPanel from "../../components/CardsPanel/CardsPanel";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState({
    _id: "",
    name: "",
    surname: "",
    profilePicPath: "",
    following: "",
    posts: "",
  });

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
        setUser(data);
        setIsLoading(false);
      });
  }, [userId]);

  return isLoading ? (
    <>
      <h1>CARREGANDO...</h1>
    </>
  ) : (
    <>
      <Header />
      <div className="homepage-flex-container fade-in">
        <div className="profile">
          <img
            className="profile-picture"
            width="200"
            height="200"
            src={user.profilePicPath}
            alt={user.name}
          />
          <h2>{user.name}</h2>
          <h2>{user.surname}</h2>
          <div className="profile-panel">
            <UserStatus user={user}/>
          </div>
        </div>
        <UserFeed userId={userId} />
        <CardsPanel />
      </div>
    </>
  );
}
