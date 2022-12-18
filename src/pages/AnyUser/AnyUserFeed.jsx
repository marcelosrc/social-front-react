import React from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../Home/HomePage";
import PostAnswerInputBox from "../../components/PostAnswerInputBox";
import formatDate from "../../components/formatDate";

export default function AnyUserFeed() {
  const { user } = React.useContext(userContext);
  const routerIdParam = useParams();
  const [posts, setPosts] = React.useState([]);
  const [postId, setPostId] = React.useState("");
  const [feedReloader, setFeedReloader] = React.useState(false);

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
        setFeedReloader(false);
      });
  }, [feedReloader, routerIdParam.userId]);

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
      <div className="post-content">
        <p>{post.content}</p>
        <small>
          <i>
            ({post.surname.toUpperCase()}, {formatDate(post.date, "full")})
          </i>
        </small>
      </div>
      {post.answerPosts.length === 0
        ? null
        : post.answerPosts.map((answerPost) => (
            <div key={answerPost._id} className="post-answers">
              <img
                className="post-answers-picture"
                src={answerPost.profilePicPath}
                alt={answerPost.name}
              />
              <div className="post-answers-content">
                <p>{answerPost.content}</p>
              </div>
            </div>
          ))}
      {user._id !== post.parentId && postId === post._id ? (
        <PostAnswerInputBox postId={postId} setFeedReloader={setFeedReloader} />
      ) : null}
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
