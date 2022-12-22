import React from "react";
import { AuthContext } from "../App";

export default function FollowButton(props) {
  const user = React.useContext(AuthContext);

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
      .then((data) => {});
  };

  if (user.following?.includes(props.anyUser._id)) {
    return (
      <button className="standard-deny-button" onClick={removeFollower}>
        Deixar de seguir
      </button>
    );
  } else if (props.anyUser.following?.includes(user._id)) {
    return (
      <button className="standard-button" onClick={addFollower}>
        Seguir de volta
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
}
