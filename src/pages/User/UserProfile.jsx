import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Home/HomePage";

export default function UserProfile() {
  const { user } = React.useContext(UserContext);

  return (
    <div className="user-profile">
      <div className="user-profile-panel">
        <div className="user-profile-panel-status">
          <Link to="/following">
            <p>Seguindo {user.followingLen}</p>
          </Link>
          <Link to="/followers">
            <p>Devotos {user.followersLen}</p>
          </Link>
          <Link to={"/users/" + user._id}>
            <p>Publicações {user.postsLen}</p>
          </Link>
          <p>Saldo R${user.score},00</p>
        </div>
      </div>
    </div>
  );
}
