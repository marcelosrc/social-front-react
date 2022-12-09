import React from "react";

export default function PostInputBox(props) {
  const [postContent, setPostContent] = React.useState("");

  const handleChange = (event) => {
    setPostContent(event.target.value);
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
        setPostContent("");
        props.reloadFeed(true);
      });
  };

  return (
    <>
      <form className="post-input-box" onSubmit={handleSubmit}>
        <label htmlFor="content">
          O que se passa nessa sua cabecinha de merda?
        </label>
        <input
          className="post-input"
          name="content"
          type="text"
          value={postContent}
          onChange={handleChange}
        />

        <button className="standard-button" type="submit">
          Postar
        </button>
      </form>
    </>
  );
}
