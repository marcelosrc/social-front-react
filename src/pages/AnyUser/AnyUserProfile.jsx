import React from "react";
import { useParams, Link } from "react-router-dom";
import FollowButton from "../../components/FollowButton";

export default function AnyUserProfile(props) {
  const routerIdParam = useParams();
  return (
    <div className="anyuser-profile">
      <img
        className="anyuser-profile-picture"
        src={props.anyUser.profilePicPath}
        alt={props.anyUser.name}
      />
      <div className="anyuser-profile-name">
        <h2>{props.anyUser.name}</h2>
        <h2>{props.anyUser.surname}</h2>
      </div>
      <div className="anyuser-profile-panel">
        <div className="anyuser-profile-panel-status">
          <Link to={"/users/" + routerIdParam.userId + "/following"}>
            <p>Seguindo {props.anyUser.followingLen}</p>
          </Link>
          <Link to={"/users/" + routerIdParam.userId + "/followers"}>
            <p>Devotos {props.anyUser.followersLen}</p>
          </Link>
          <Link to={"/users/" + props.anyUser._id}>
            <p>Publicações {props.anyUser.postsLen}</p>
          </Link>
        </div>
      </div>
      <FollowButton
        anyUser={props.anyUser}
        setReloadAnyUser={props.setReloadAnyUser}
      />
    </div>
  );
}
