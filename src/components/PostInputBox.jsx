import React from "react";
import { UserContext } from "../pages/Home/HomePage";

export default function PostInputBox(props) {
  const { user, setReloadUser } = React.useContext(UserContext);
  const [postContent, setPostContent] = React.useState("");
  const [count, setCount] = React.useState(0);
  const maxLength = 300;
  const postValue = 50;

  const subtractFromScore = () => {
    fetch("/users/update/" + user._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ $inc: { score: -postValue } }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setReloadFeed(true);
        setReloadUser(true);
      });
  };

  const handleChange = (event) => {
    setPostContent(event.target.value);
    setCount(event.target.value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.score <= postValue) {
      alert(`Você precisa ter, no mínimo, ${postValue} pontos para publicar`);
      setPostContent("");
      setCount(0);
    } else {
      fetch("/posts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ content: postContent }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPostContent("");
          setCount(0);
          subtractFromScore();
        });
    }
  };

  return (
    <form className="post-input-box" onSubmit={handleSubmit}>
      <label htmlFor="content">Qual é a sua verdade absoluta de hoje?</label>
      <textarea
        className="post-textarea"
        name="content"
        type="text"
        rows="3"
        value={postContent}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <small className="lightgray">
        {count}/{maxLength}
      </small>
      <button
        className={
          user.score <= postValue ? "standard-grayed-button" : "standard-button"
        }
        type="submit"
      >
        Publicar ({postValue} pontos)
      </button>
    </form>
  );
}
