import React from "react";
import { useParams, Link } from "react-router-dom";

export default function AnyUserFeed() {
  const routerIdParam = useParams();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("/queries/feed/" + routerIdParam.userId, {
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
  }, [routerIdParam.userId]);

  const renderedPost = posts.map((post) => (
    <div key={post._id} className="post">
      <Link to={"/" + post.parentId + "/" + post._id}>
        <div className="post-content">
          <p>
            {post.content.substring(0, 1) === '"' ? "" : '"'}
            {post.content}
            {post.content.substring(-1, 1) === '"' ? "" : '"'}
          </p>
        </div>
        <div className="post-info">
          <small>
            {post.answerPostsCount} resposta
            {post.answerPostsCount !== 1 ? "s" : ""} (
            {post.answerDislikePostsCount} refutaç
            {post.answerDislikePostsCount !== 1 ? "ões" : "ão"} e{" "}
            {post.answerLikePostsCount} endosso
            {post.answerLikePostsCount !== 1 ? "s" : ""})
          </small>
        </div>
      </Link>
    </div>
  ));
  return <div className="anyuser-feed">{renderedPost}</div>;
}
