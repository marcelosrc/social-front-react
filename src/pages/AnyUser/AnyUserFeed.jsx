import React from "react";
import { useParams } from "react-router-dom";
import formatDate from "../../components/formatDate";

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
      <div className="post-content">
        <p>{post.content}</p>
        <small>
          <i>
            ({post.surname.toUpperCase()}, {formatDate(post.date, "full")})
          </i>
        </small>
      </div>
      <div className="post-footer" />
    </div>
  ));
  return posts.length === 0 ? (
    <div className="anyuser-feed">
      <h1>Esse usuário ainda não tem publicações</h1>
    </div>
  ) : (
    <div className="anyuser-feed">{renderedPost}</div>
  );
}
