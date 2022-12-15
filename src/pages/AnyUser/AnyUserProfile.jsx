import React from "react";
import { userContext } from "../Home/HomePage";

export default function AnyUserProfile(props) {
  const user = React.useContext(userContext);

  const addFollower = () => {
    fetch("/users/update/" + user._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ following: props.anyUser._id }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };
  return (
    <div className="profile">
      <img
        className="profile-picture"
        src={props.anyUser.profilePicPath}
        alt={props.anyUser.name}
      />
      <h2>{props.anyUser.name}</h2>
      <h2>{props.anyUser.surname}</h2>
      <div className="profile-panel">
        <div className="profile-panel-status">
          <p>Seguindo {props.anyUser.following}</p>
          <p>Devotos {props.anyUser.followers}</p>
          <p>Publicações {props.anyUser.posts}</p>
        </div>
        <button className="standard-button" onClick={addFollower}>
          Seguir
        </button>
      </div>
    </div>
  );
}
