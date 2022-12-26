import React from "react";
import { Link } from "react-router-dom";
import { AnyUserContext } from "./AnyUserPage";
import FollowButton from "../../components/FollowButton";

export default function AnyUserProfile() {
  const { anyUser } = React.useContext(AnyUserContext);

  return (
    <div className="anyuser-profile">
      <Link to={"/users/" + anyUser._id}>
        <img
          className="anyuser-profile-picture"
          src={anyUser.profilePicPath}
          alt={anyUser.name}
        />
      </Link>
      <div className="anyuser-profile-name">
        <Link to={"/users/" + anyUser._id}>
          <h2>{anyUser.name}</h2>
        </Link>
        <Link to={"/users/" + anyUser._id}>
          <h2>{anyUser.surname}</h2>
        </Link>
      </div>
      <div className="anyuser-profile-panel">
        <div className="anyuser-profile-panel-status">
          <Link to={"/users/" + anyUser._id + "/following"}>
            <p>Seguindo {anyUser.followingLen}</p>
          </Link>
          <Link to={"/users/" + anyUser._id + "/followers"}>
            <p>Devotos {anyUser.followersLen}</p>
          </Link>
          <Link to={"/users/" + anyUser._id}>
            <p>Publicações {anyUser.postsLen}</p>
          </Link>
        </div>
      </div>
      <FollowButton />
    </div>
  );
}
