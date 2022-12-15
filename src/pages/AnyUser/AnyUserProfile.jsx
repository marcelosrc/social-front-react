import React from "react";

export default function AnyUserProfile(props) {
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
        <button className="standard-button">Seguir</button>
      </div>
    </div>
  );
}
