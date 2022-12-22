import React from "react";
import { Link, useParams } from "react-router-dom";
import PostAnswerInputBox from "../../components/PostAnswerInputBox";
import formatDate from "../../components/formatDate";

export default function UserFeed() {
  const routerIdParam = useParams();
  const [post, setPost] = React.useState({});

  React.useEffect(() => {
    fetch("/queries/post/" + routerIdParam.postId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  }, [routerIdParam.postId]);

  const answerPosts = post.answerPosts.map((answerPost) => {
    return (
      <div key={answerPost._id} className="post-answers">
        <Link to={"/users/" + answerPost.ownerId}>
          <img
            className="post-answers-picture"
            src={answerPost.profilePicPath}
            alt={answerPost.name}
          />
        </Link>
        <div className="post-answers-content">
          <p>{answerPost.content}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="user-feed">
      <div className="feed-content">
        <div key={post._id} className="post">
          <div className="post-header">
            <Link to={"/users/" + post.ownerId}>
              <img
                className="post-profile-picture"
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
          {answerPosts}
          <PostAnswerInputBox postId={routerIdParam.postId} />
          <div className="post-menu"></div>
        </div>
      </div>
    </div>
  );
}
