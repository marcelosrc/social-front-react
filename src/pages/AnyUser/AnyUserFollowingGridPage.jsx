import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FollowButton from "../../components/FollowButton";

export default function AnyUserFollowingGridPage() {
  const routerIdParam = useParams();
  const [cards, setCards] = React.useState([]);
  const [reloadAnyUser, setReloadAnyUser] = React.useState(false);

  React.useEffect(() => {
    fetch("/queries/following/" + routerIdParam.userId, {
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
  }, [reloadAnyUser, routerIdParam.userId]);

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
      <div className="grid">{renderedCard}</div>
    </>
  );
}
