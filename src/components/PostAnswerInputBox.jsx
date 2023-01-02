import React from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../pages/Home/HomePage";

export default function PostAnswerInputBox(props) {
  const routerIdParam = useParams();
  const { user, setReloadUser } = React.useContext(UserContext);
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
      .then((data) => {
        setReloadUser(true);
        props.setReloadPost(true);
      });
  };

  const handleChange = (event) => {
    setPostContent(event.target.value);
    setCount(event.target.value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.score <= postValue) {
      alert(
        `Você precisa ter, no mínimo, ${postValue} pontos para endossar/refutar`
      );
      setPostContent("");
      setCount(0);
    } else {
      fetch("/posts/create/" + props.postId, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          content: postContent,
          reaction: event.nativeEvent.submitter.name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPostContent("");
          setCount(0);
          subtractFromScore();
        });
    }
  };

  if (user._id !== routerIdParam.userId) {
    return (
      <form className="postpage-post-answer-input-box" onSubmit={handleSubmit}>
        <textarea
          className="postpage-post-textarea"
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
              user.score <= postValue
                ? "standard-grayed-button"
                : "standard-button"
            }
            name="like"
            type="submit"
          >
            Endossar ({postValue} pontos)
          </button>
          <button
            className={
              user.score <= postValue
                ? "standard-grayed-button"
                : "standard-deny-button"
            }
            name="dislike"
            type="submit"
          >
            Refutar ({postValue} pontos)
          </button>
        </div>
      </form>
    );
  } else {
    <></>;
  }
}
