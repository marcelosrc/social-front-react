import React from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Home/HomePage";
import PostAnswerInputBox from "../../components/PostAnswerInputBox";
import PostAnswerAnswerInputBox from "../../components/PostAnswerAnswerInputBox";
import formatDate from "../../components/formatDate";

export default function AnyUserPost() {
  const routerIdParam = useParams();
  const { user } = React.useContext(UserContext);
  const [reloadPost, setReloadPost] = React.useState(false);
  const [post, setPost] = React.useState({
    _id: "",
    parentId: "",
    name: "",
    surname: "",
    profilePicPath: null,
    content: "",
    reaction: "",
    date: "",
    answerPosts: [],
  });

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
        setReloadPost(false);
      });
  }, [reloadPost, routerIdParam.postId]);

  const allowAnswer = () => {
    let allow = true;
    for (let i = 0; i < post.answerPosts.length; i++) {
      if (post.answerPosts[i].ownerId === user._id) {
        allow = false;
      }
    }
    return allow;
  };

  const answerPosts = post.answerPosts.map((answerPost) => {
    return (
      <div
        key={answerPost._id}
        className={
          answerPost.reaction === "dislike"
            ? "postpage-post-dislike-answer"
            : answerPost.reaction === "like"
            ? "postpage-post-like-answer"
            : "postpage-post-answer"
        }
      >
        <div className="postpage-post-answers-content">
          <Link to={"/" + answerPost.ownerId}>
            <img
              className="postpage-post-answers-picture"
              src={answerPost.profilePicPath}
              alt={answerPost.name}
            />
          </Link>
          <div className="postpage-post-answers-text">
            <h3>
              <b>
                {`${answerPost.name} ${
                  answerPost.reaction === "dislike"
                    ? "REFUTOU essa publicação:"
                    : answerPost.reaction === "like"
                    ? "endossou essa publicação:"
                    : ""
                }`}
              </b>
            </h3>
            <p>{answerPost.content}</p>
          </div>
        </div>
        {answerPost.answerPosts.map((answerAnswerPost) => {
          return (
            <div
              key={answerAnswerPost._id}
              className="postpage-post-answers-answers"
            >
              <Link to={"/" + answerAnswerPost.ownerId}>
                <img
                  className="postpage-post-answers-answers-picture"
                  src={answerAnswerPost.profilePicPath}
                  alt={answerAnswerPost.name}
                />
              </Link>
              <div className="postpage-post-answers-answers-content">
                <p>{answerAnswerPost.content}</p>
              </div>
            </div>
          );
        })}
        <div className="postpage-post-answers-answers-input-box">
          <PostAnswerAnswerInputBox
            postId={answerPost._id}
            setReloadPost={setReloadPost}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="post-feed">
      <div key={post._id} className="postpage-post">
        <div className="postpage-post-content">
          <p>
            {post.content.substring(0, 1) === '"' ? "" : '"'}
            {post.content}
            {post.content.substring(-1, 1) === '"' ? "" : '"'}
          </p>
          <small>
            <i>
              ({post.surname.toUpperCase()}, {formatDate(post.date)})
            </i>
          </small>
        </div>
        {user._id !== routerIdParam.userId && allowAnswer() ? (
          <PostAnswerInputBox
            postId={routerIdParam.postId}
            setReloadPost={setReloadPost}
          />
        ) : (
          <></>
        )}
      </div>
      {answerPosts}
    </div>
  );
}
