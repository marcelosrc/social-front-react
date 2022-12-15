import React from "react";
import { userContext } from "../Home/HomePage";

export default function UserProfile() {
  const user = React.useContext(userContext);

  return (
    <div className="profile">
      <div className="profile-panel">
        <div className="profile-panel-status">
          <p>Seguindo {user.following?.length}</p>
          <p>Devotos {user.followers?.length}</p>
          <p>Publicações {user.posts?.length}</p>
        </div>
      </div>
    </div>
  );
}
