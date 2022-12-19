import React from "react";
import { userContext } from "../pages/Home/HomePage";

export default function FollowButton(props) {
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
}
