import React from "react";
import { userContext } from "../Home/HomePage";

export default function UserProfile() {
  const { user } = React.useContext(userContext);

  return (
    <div className="profile">
      <div className="profile-panel">
        <div className="profile-panel-status">
          <p>Seguindo {user.followingLen}</p>
          <p>Devotos {user.followersLen}</p>
          <p>Publicações {user.postsLen}</p>
        </div>
      </div>
    </div>
  );
}
