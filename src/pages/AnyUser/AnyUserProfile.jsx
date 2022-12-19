import React from "react";
import FollowButton from "../../components/FollowButton";

export default function AnyUserProfile(props) {
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
          <p>Seguindo {props.anyUser.followingLen}</p>
          <p>Devotos {props.anyUser.followersLen}</p>
          <p>Publicações {props.anyUser.postsLen}</p>
        </div>
      </div>
      <FollowButton
        anyUser={props.anyUser}
        setReloadAnyUser={props.setReloadAnyUser}
      />
    </div>
  );
}
