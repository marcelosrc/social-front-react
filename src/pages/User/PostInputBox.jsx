import React from "react";

export default function PostInputBox(props) {
  const [postContent, setPostContent] = React.useState("");
  const [count, setCount] = React.useState(0);
  const maxLength = 300

  const handleChange = (event) => {
    setPostContent(event.target.value);
    setCount(event.target.value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        setPostContent(data);
        setPostContent("");
        setCount(0);
        props.setFeedReloader(true);
      });
  };

  return (
    <>
      <form className="post-input-box" onSubmit={handleSubmit}>
        <label htmlFor="content">Vai, manda sua merdinha de hoje</label>
        <textarea
          className="post-textarea"
          name="content"
          type="text"
          rows="3"
          value={postContent}
          onChange={handleChange}
          maxLength={maxLength}
        />
        <small className="lightgray">{count}/{maxLength}</small>
        <button className="standard-button" type="submit">
          Postar
        </button>
      </form>
    </>
  );
}
