import React from "react";
import { userContext } from "../Home/HomePage";

export default function UserProfile() {
  const { user } = React.useContext(userContext);

  return (
    <div className="user-profile">
      <div className="user-profile-panel">
        <div className="user-profile-panel-status">
          <p>Seguindo {user.followingLen}</p>
          <p>Devotos {user.followersLen}</p>
          <p>Publicações {user.postsLen}</p>
        </div>
      </div>
    </div>
  );
}
