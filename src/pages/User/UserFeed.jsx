import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../components/formatDate";

export default function UserFeed(props) {
  const [posts, setPosts] = React.useState([]);
  const [reloadGeneralFeed, setReloadGeneralFeed] = React.useState(false);

  React.useEffect(() => {
    fetch(`/queries/feed/${props.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setReloadGeneralFeed(false);
      });
  }, [reloadGeneralFeed, props.userId]);

  const profileLink = "/users/";
  const renderedPost = posts.map((post) => (
    <div key={post._id} className="post fade-in">
      <div>
        <Link to={profileLink + post.parentId}>
          <img
            className="post-profile-picture"
            width="100"
            height="100"
            src={post.profilePicPath}
            alt={post.name}
          />
        </Link>
        <div className="post-profile">
          <small className="lightgray">{formatDate(post.date)}</small>
        </div>
      </div>
      <div className="post-content">
        <Link to={profileLink + post.parentId}>
          <h3>{post.name}</h3>
        </Link>
        <p>{post.content}</p>
      </div>
    </div>
  ));
  return <div className="generalfeed">{renderedPost}</div>;
}
