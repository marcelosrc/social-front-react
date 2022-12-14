import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../components/formatDate";

export default function AnyUserFeed() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("/queries/feed/639618bdd590b3f28f94da5b", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  });

  const profileLink = "/users/";
  const renderedPost = posts.map((post) => (
    <div key={post._id} className="post fade-in">
      <div className="post-header">
        <Link to={profileLink + post.parentId}>
          <img
            className="post-profile-picture"
            width="80"
            height="80"
            src={post.profilePicPath}
            alt={post.name}
          />
        </Link>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        <small>
          <i>
            ({post.surname.toUpperCase()}, {formatDate(post.date)})
          </i>
        </small>
      </div>
    </div>
  ));
  return renderedPost.length === 0 ? (
    <div className="generalfeed">
      <h1>Não há publicações</h1>
    </div>
  ) : (
    <div className="generalfeed">{renderedPost}</div>
  );
}
