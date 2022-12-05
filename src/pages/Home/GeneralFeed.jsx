import React from "react";
import PostInputBox from "./PostInputBox";

export default function GeneralFeed() {
  const [posts, setPosts] = React.useState([
    {
      _id: "",
      name: "",
      profilePicPath: "",
      content: "",
      date: "",
    },
  ]);

  React.useEffect(() => {
    fetch("/queries/generalfeed", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => alert(err));
  }, []);

  function formatDate(date) {
    const formattedDate = new Date(date);
    const [day, month, hours, minutes] = [
      formattedDate.getDate(),
      formattedDate.getMonth(),
      formattedDate.getHours(),
      formattedDate.getMinutes(),
    ];
    return (
      <small>
        {hours}:{minutes} ({day}/{month})
      </small>
    );
  }

  const renderedPost = posts.map((post) => (
    <div key={post._id} className="post fade-in">
      <div className="post-profile-picture">
        <img
          width="100"
          height="100"
          src={post.profilePicPath}
          alt={post.name}
        />
        <div className="post-profile">{formatDate(post.date)}</div>
      </div>
      <div className="post-profile-content">
        <h3>{post.name}</h3>
        <p>{post.content}</p>
      </div>
      <div className="post-dropdown-panel">
        <p></p>
        <div className="post-dropdown-content fade-in">
          <p>Remover post {post._id}</p>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className="generalfeed">
        <PostInputBox />
        {renderedPost}
      </div>
    </>
  );
}
