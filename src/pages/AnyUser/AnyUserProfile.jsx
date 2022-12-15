import React from "react";
import { userContext } from "../Home/HomePage";

export default function AnyUserProfile(props) {
  const user = React.useContext(userContext);
  const [isFollowing, SetIsFollowing] = React.useState("");

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
      .then((data) => {});
  };

  const deleteFollower = () => {
    fetch("/users/update/" + user._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ $pull: { following: props.anyUser._id } }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  React.useEffect(() => {
    if (user.following?.includes(props.anyUser._id)) {
      SetIsFollowing(
        <button className="standard-deny-button">Deixar de Seguir</button>
      );
    } else if (user._id !== props.anyUser._id) {
      SetIsFollowing(<button className="standard-button">Seguir</button>);
    } else {
      SetIsFollowing(null);
    }
  }, [user.following, user._id, props.anyUser._id]);

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
      {isFollowing}
    </div>
  );
}

/*
return (
        <button className="standard-deny-button" onClick={deleteFollower}>
          Deixar de Seguir
        </button>
      );

return (
        <button className="standard-button" onClick={addFollower}>
          Seguir
        </button>
      );
*/
