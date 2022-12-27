import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Home/HomePage";
import PostInputBox from "./PostInputBox";

export default function UserFeed() {
  const { setReloadUser } = React.useContext(UserContext);
  const [posts, setPosts] = React.useState([]);
  const [reloadFeed, setReloadFeed] = React.useState(false);

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
        setReloadFeed(false);
        setReloadUser(true);
      });
  }, [reloadFeed, setReloadUser]);

  const renderedPost = posts.map((post) => (
    <div key={post._id} className="post">
      <Link to={post.parentId + "/" + post._id}>
        <div className="post-header">
          <img
            className="post-profile-picture"
            src={post.profilePicPath}
            alt={post.name}
          />
        </div>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
        <div className="post-info">
          <small>
            {post.answerPosts.length} resposta
            {post.answerPosts.length !== 1 ? "s" : ""}
          </small>
        </div>
      </Link>
    </div>
  ));
  return (
    <div className="user-feed">
      <PostInputBox setReloadFeed={setReloadFeed} />
      <div className="feed-content">{renderedPost}</div>
    </div>
  );
}
