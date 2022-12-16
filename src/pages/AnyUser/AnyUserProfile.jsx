import React from "react";
import { userContext } from "../Home/HomePage";

export default function AnyUserProfile(props) {
  const { user, setReloadUser } = React.useContext(userContext);

  const addFollower = () => {
    fetch("/users/update/" + user._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ $addToSet: { following: props.anyUser._id } }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setReloadAnyUser(true);
        setReloadUser(true);
      });
  };

  const removeFollower = () => {
    fetch("/users/update/" + user._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ $pull: { following: props.anyUser._id } }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setReloadAnyUser(true);
        setReloadUser(true);
      });
  };

  const FollowButton = () => {
    if (user.following?.includes(props.anyUser._id)) {
      return (
        <button className="standard-deny-button" onClick={removeFollower}>
          Deixar de Seguir
        </button>
      );
    } else if (user._id === props.anyUser._id) {
      return null;
    }
    return (
      <button className="standard-button" onClick={addFollower}>
        Seguir
      </button>
    );
  };

  return (
    <div className="profile">
      <img
        className="profile-picture"
        src={props.anyUser.profilePicPath}
        alt={props.anyUser.name}
      />
      <h2>{props.anyUser.name}</h2>
      <h2>{props.anyUser.surname}</h2>
      <div className="profile-panel">
        <div className="profile-panel-status">
          <p>Seguindo {props.anyUser.followingLen}</p>
          <p>Devotos {props.anyUser.followersLen}</p>
          <p>Publicações {props.anyUser.postsLen}</p>
        </div>
      </div>
      <FollowButton />
    </div>
  );
}
