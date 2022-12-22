import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

export default function UserProfile() {
  const user = React.useContext(AuthContext);

  return (
    <div className="user-profile">
      <div className="user-profile-panel">
        <div className="user-profile-panel-status">
          <Link to="/following/">
            <p>Seguindo {user.followingLen}</p>
          </Link>
          <Link to="/followers">
            <p>Devotos {user.followersLen}</p>
          </Link>
          <Link to={"/users/" + user._id}>
            <p>Publicações {user.postsLen}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
