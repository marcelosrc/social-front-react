import React from "react";
import { Link } from "react-router-dom";
import { userContext } from "../Home/HomePage";
import FollowButton from "../../components/FollowButton";

export default function UserFollowingGridPage() {
  const { user } = React.useContext(userContext);
  const [cards, setCards] = React.useState([]);
  const [reloadAnyUser, setReloadAnyUser] = React.useState(false);

  React.useEffect(() => {
    fetch("/queries/following/" + user._id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setReloadAnyUser(false);
      });
  }, [reloadAnyUser, user._id]);

  const profileLink = "/users/";
  const renderedCard = cards.map((card) => (
    <div key={card._id} className="card">
      <Link to={profileLink + card._id}>
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
      <FollowButton anyUser={card} setReloadAnyUser={setReloadAnyUser} />
    </div>
  ));
  return (
    <>
      <div className="top-empty-space" />
      <div className="grid-title">
        <h1>Os que influenciam {user.name}</h1>
      </div>
      <div className="grid">{renderedCard}</div>
    </>
  );
}
