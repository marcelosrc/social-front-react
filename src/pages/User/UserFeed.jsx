import React from "react";
import { Link } from "react-router-dom";
import PostInputBox from "./PostInputBox";
import formatDate from "../../components/formatDate";

export default function UserFeed() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("/queries/userfeed", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const renderedPost = posts.map((post) => (
    <div key={post._id} className="post">
      <Link to={"/posts/" + post._id}>
        <div className="post-header">
          <img
            className="post-profile-picture"
            src={post.profilePicPath}
            alt={post.name}
          />
        </div>
        <div className="post-content">
          <p>{post.content}</p>
          <small>
            <i>
              ({post.surname.toUpperCase()}, {formatDate(post.date)})
            </i>
          </small>
        </div>
      </Link>
    </div>
  ));
  return (
    <div className="user-feed">
      <PostInputBox />
      <div className="feed-content">{renderedPost}</div>
    </div>
  );
}
