import React from "react";
import { UserContext } from "../pages/Home/HomePage";
import { AnyUserContext } from "../pages/AnyUser/AnyUserPage";

export default function FollowButton() {
  const { user, setReloadUser } = React.useContext(UserContext);
  const { anyUser, setReloadAnyUser } = React.useContext(AnyUserContext);

  const addFollower = () => {
    fetch("/users/update/" + user._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ $addToSet: { following: anyUser._id } }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReloadUser(true);
        setReloadAnyUser(true);
      });
  };

  const removeFollower = () => {
    fetch("/users/update/" + user._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ $pull: { following: anyUser._id } }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReloadUser(true);
        setReloadAnyUser(true);
      });
  };

  if (user.following?.includes(anyUser._id)) {
    return (
      <button className="standard-deny-button" onClick={removeFollower}>
        Deixar de seguir
      </button>
    );
  } else if (anyUser.following?.includes(user._id)) {
    return (
      <button className="standard-button" onClick={addFollower}>
        Seguir de volta
      </button>
    );
  } else if (user._id === anyUser._id) {
    return null;
  }
  return (
    <button className="standard-button" onClick={addFollower}>
      Seguir
    </button>
  );
}
