import React from "react";
import { Link } from "react-router-dom";

export default function PeopleCards() {
  const [people, setPeople] = React.useState([]);

  React.useEffect(() => {
    fetch("/queries/peoplecards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch((err) => alert(err));
  }, []);

  const renderedCard = people.map((card) => (
    <div key={card._id} className="people-card">
      <Link to={"/users/" + card._id}>
        <img
          className="people-card-picture"
          src={card.profilePicPath}
          alt={card.name}
        />
      </Link>
      <div className="people-card-name">
        <Link to={"/users/" + card._id}>
          <p>
            <b>{card.name}</b>
          </p>
          <p>
            <b>{card.surname}</b>
          </p>
        </Link>
      </div>
    </div>
  ));
  return <div className="cards-feed">{renderedCard}</div>;
}
