import React from "react";
import Header from "./Header";
import GeneralFeed from "./GeneralFeed";
import CardsPanel from "./CardsPanel";
import { AuthContext } from "../../App";

export default function HomePage() {
  const webtoken = React.useContext(AuthContext);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    surname: "",
    profilePicPath: "",
  });

  React.useEffect(() => {
    fetch("/users/myuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${webtoken}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch((err) => alert(err));
  }, [webtoken]);

  return (
    <>
      <Header />
      <div className="homepage-flex-container">
        <div className="profile">
          <img
            className="profile-picture"
            width="200"
            height="200"
            src={currentUser.profilePicPath}
            alt={currentUser.name}
          />
          <h2>{currentUser.name}</h2>
          <h2>{currentUser.surname}</h2>
          <div className="profile-panel"></div>
        </div>
        <GeneralFeed />
        <CardsPanel />
      </div>
    </>
  );
}
