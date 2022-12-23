import React from "react";

export default function PostAnswerInputBox(props) {
  const [postContent, setPostContent] = React.useState("");
  const [count, setCount] = React.useState(0);
  const maxLength = 300;

  const handleChange = (event) => {
    setPostContent(event.target.value);
    setCount(event.target.value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        setPostContent(data);
        setPostContent("");
        setCount(0);
      });
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
        <button className="standard-button" type="submit">
          Endossar
        </button>
        <button className="standard-deny-button" type="submit">
          Refutar
        </button>
      </div>
    </form>
  );
}
