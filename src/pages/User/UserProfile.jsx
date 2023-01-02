import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Home/HomePage";

export default function UserProfile() {
  const { user } = React.useContext(UserContext);

  return (
    <div className="user-profile">
      <div className="user-profile-panel">
        <div className="user-profile-panel-status">
          <Link to={"/" + user._id + "/following"}>
            <p>Seguindo {user.followingLen}</p>
          </Link>
          <Link to={"/" + user._id + "/followers"}>
            <p>{user.followersLen} devotos </p>
          </Link>
          <Link to={"/" + user._id}>
            <p>{user.postsLen} publicações </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
