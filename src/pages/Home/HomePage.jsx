import React from "react";
import Header from "../../components/Header/Header";
import UserStatus from "../../components/UserStatus";
import GeneralFeed from "./GeneralFeed";
import CardsPanel from "../../components/CardsPanel/CardsPanel";

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    surname: "",
    profilePicPath: "",
    following: "",
    posts: "",
    followers: "",
  });
  const [reloadCurrentUser, setReloadCurrentUser] = React.useState(false);

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
        setCurrentUser(data);
        setIsLoading(false);
        setReloadCurrentUser(false);
      });
  }, [reloadCurrentUser]);

  return isLoading ? (
    <div className="standard-center-page">
      <h1>CARREGANDO...</h1>
    </div>
  ) : (
    <>
      <Header currentUser={currentUser}/>
      <div className="homepage-flex-container fade-in">
        <div className="profile">
          <div className="profile-panel">
            <UserStatus currentUser={currentUser} />
          </div>
        </div>
        <GeneralFeed
          currentUser={currentUser._id}
          setReloadCurrentUser={setReloadCurrentUser}
        />
        <CardsPanel />
      </div>
    </>
  );
}
