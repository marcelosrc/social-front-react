import React from "react";
import Header from "../Header/Header";
import GeneralFeed from "./GeneralFeed";
import CardsPanel from "../../components/CardsPanel/CardsPanel";

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    surname: "",
    profilePicPath: "",
    followers: "",
    posts: "",
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
        setReloadCurrentUser(false)
      });
  }, [reloadCurrentUser]);

  return isLoading ? (
    <>
      <h1>CARREGANDO...</h1>
    </>
  ) : (
    <>
      <Header />
      <div className="homepage-flex-container fade-in">
        <div className="profile">
          <div className="profile-card-id">
            <div>
              <img
                className="profile-picture"
                width="50"
                height="50"
                src={currentUser.profilePicPath}
                alt={currentUser.name}
              />
            </div>
            <div className="profile-card-name">
              <p>
                <b>{currentUser.name}</b>
              </p>
              <p>
                <b>{currentUser.surname}</b>
              </p>
            </div>
          </div>
          <div className="profile-panel">
              <h3 >Devotos {currentUser.followers}</h3>
              <h3>Verdades {currentUser.posts}</h3>
          </div>
        </div>
        <GeneralFeed setReloadCurrentUser={setReloadCurrentUser}/>
        <CardsPanel />
      </div>
    </>
  );
}
