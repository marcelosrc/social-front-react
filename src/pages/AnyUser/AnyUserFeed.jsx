import React from "react";
import { useParams, Link } from "react-router-dom";
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
      <Link to={"/posts/" + post._id}>
        <div className="post-content">
          <p>{post.content}</p>
          <small>
            <i>
              ({post.surname.toUpperCase()}, {formatDate(post.date, "full")})
            </i>
          </small>
        </div>
      </Link>
    </div>
  ));
  return <div className="anyuser-feed">{renderedPost}</div>;
}
