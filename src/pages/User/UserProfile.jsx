import React from "react";
import { Link } from "react-router-dom";
import { userContext } from "../Home/HomePage";

export default function UserProfile() {
  const { user } = React.useContext(userContext);
  const profileLink = "/users/";

  return (
    <div className="user-profile">
      <div className="user-profile-panel">
        <Link to={profileLink + user._id}>
          <p>
            <b>Meu perfil</b>
          </p>
        </Link>
        <div className="user-profile-panel-status">
          <p>Seguindo {user.followingLen}</p>
          <p>Devotos {user.followersLen}</p>
          <p>Publicações {user.postsLen}</p>
        </div>
      </div>
    </div>
  );
}
