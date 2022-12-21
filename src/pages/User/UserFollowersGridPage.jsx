import React from "react";
import { Link } from "react-router-dom";
import FollowButton from "../../components/FollowButton";

export default function UserFollowersGridPage() {
  const [user, setUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    fetch("/users/myuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        fetch("/queries/followers/" + data._id, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setCards(data);
          });
      });
  }, []);

  const renderedCard = cards.map((card) => (
    <div key={card._id} className="card">
      <Link to={"/users/" + card._id}>
        <img
          className="card-picture"
          src={card.profilePicPath}
          alt={card.name}
        />
      </Link>
      <div>
        <h1>{card.name}</h1>
        <h1>{card.surname}</h1>
      </div>
      <FollowButton anyUser={card} />
    </div>
  ));
  return (
    <>
      <div className="top-empty-space" />
      <div className="grid-title">
        <h1>Devotos de {user.name}</h1>
      </div>
      <div className="grid">{renderedCard}</div>
    </>
  );
}
