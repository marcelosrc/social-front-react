import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FollowButton from "../../components/FollowButton";

export default function AnyUserFollowersGridPage() {
  const routerIdParam = useParams();
  const [anyUser, setAnyUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

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
        fetch("/queries/followers/" + routerIdParam.userId, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setCards(data);
          });
      });
  }, [routerIdParam.userId]);

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
        <h1>Devotos de {anyUser.name} {anyUser.surname}</h1>
      </div>
      <div className="grid">{renderedCard}</div>
    </>
  );
}
