import React from "react";
import { AuthContext } from "../App";

export default function PostAnswerInputBox(props) {
  const user = React.useContext(AuthContext);
  const [postContent, setPostContent] = React.useState("");
  const [count, setCount] = React.useState(0);
  const maxLength = 300;
  const postValue = 10;

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
      .then((data) => {});
  };

  const handleChange = (event) => {
    setPostContent(event.target.value);
    setCount(event.target.value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.score <= 0) {
      alert("Você não tem dinheiro");
      setPostContent("");
      setCount(0);
    } else {
      fetch("/posts/create/" + props.postId, {
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
    <form className="postpage-post-answer-input-box" onSubmit={handleSubmit}>
      <textarea
        className="postpage-post-textarea"
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
      <div className="postpage-post-answer-buttons">
        <button
          className={
            user.score <= 0 ? "standard-grayed-button" : "standard-button"
          }
          name="like"
          type="submit"
        >
          Endossar ({postValue}R$)
        </button>
        <button
          className={
            user.score <= 0 ? "standard-grayed-button" : "standard-deny-button"
          }
          name="dislike"
          type="submit"
        >
          Refutar ({postValue}R$)
        </button>
      </div>
    </form>
  );
}
