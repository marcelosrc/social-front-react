import React from "react";
import { AuthContext } from "../../App";

export default function PeopleCards() {
  const webtoken = React.useContext(AuthContext);
  const [people, setPeople] = React.useState([
    {
      _id: "",
      name: "",
      surname: "",
      profilePicPath: "",
      bio: "",
    },
  ]);

  React.useEffect(() => {
    fetch("/queries/peoplecards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${webtoken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch((err) => alert(err));
  }, [webtoken]);

  const renderedCard = people.map((card) => (
    <div key={card._id} className="people-card">
      <div className="people-card-id">
        <div>
          <img
            className="people-card-picture"
            width="50"
            height="50"
            src={card.profilePicPath}
            alt={card.name}
          />
        </div>
        <div className="people-card-name">
          <p>
            <b>{card.name}</b>
          </p>
          <p>
            <b>{card.surname}</b>
          </p>
        </div>
      </div>
      <div className="people-card-bio">
        <p>{card.bio}</p>
      </div>
    </div>
  ));
  return <div className="cards">{renderedCard}</div>;
}
