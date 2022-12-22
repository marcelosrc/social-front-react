import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import PostInputBox from "./PostInputBox";
import PostAnswerInputBox from "../../components/PostAnswerInputBox";
import PostMenu from "../../components/PostMenu";
import formatDate from "../../components/formatDate";

export default function UserFeed() {
  const user = React.useContext(AuthContext);
  const [posts, setPosts] = React.useState([]);
  const [postId, setPostId] = React.useState("");

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

  const postMenuHandler = (postId) => {
    setPostId(postId);
  };

  const renderedPost = posts.map((post) => (
    <div
      key={post._id}
      className="post"
      onMouseEnter={() => postMenuHandler(post._id)}
      onMouseLeave={() => postMenuHandler(null)}
    >
      <div className="post-header">
        <Link to={"/users/" + post.parentId}>
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
      {post.answerPosts.length === 0
        ? null
        : post.answerPosts.map((answerPost) => (
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
          ))}
      {user._id !== post.parentId && postId === post._id ? (
        <PostAnswerInputBox postId={postId} />
      ) : null}
      <div className="post-menu">
        {user._id === post.parentId && postId === post._id ? (
          <PostMenu postId={postId} />
        ) : null}
      </div>
    </div>
  ));
  return (
    <div className="user-feed">
      <PostInputBox />
      <div className="feed-content">{renderedPost}</div>
    </div>
  );
}
