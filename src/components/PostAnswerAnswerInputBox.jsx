import React from "react";

export default function PostAnswerAnswerInputBox(props) {
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
        setPostContent("");
        setCount(0);
        props.setReloadPost(true);
      });
  };

  return (
    <form
      className="postpage-post-answers-answers-form"
      onSubmit={handleSubmit}
    >
      <textarea
        className="postpage-post-answers-answers-textarea"
        type="text"
        rows="1"
        value={postContent}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <small className="lightgray">
        {count}/{maxLength}
      </small>
      <button className={"standard-button"} type="submit">
        Responder
      </button>
    </form>
  );
}
