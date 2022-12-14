import React from "react";
import { anyUserContext } from "./AnyUserPage";

export default function AnyUserProfile() {
  const anyUser = React.useContext(anyUserContext);

  return (
    <div className="profile">
      <img
        className="profile-picture"
        src={anyUser.profilePicPath}
        alt={anyUser.name}
      />
      <h2>{anyUser.name}</h2>
      <h2>{anyUser.surname}</h2>
      <div className="profile-panel">
        <div className="profile-panel-status">
          <p>Seguindo {anyUser.following}</p>
          <p>Devotos {anyUser.followers}</p>
          <p>Publicações {anyUser.posts}</p>
        </div>
        <button className="standard-button">Seguir</button>
      </div>
    </div>
  );
}
