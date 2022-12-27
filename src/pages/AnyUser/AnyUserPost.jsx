import React from "react";
import { Link, useParams } from "react-router-dom";
import PostAnswerInputBox from "../../components/PostAnswerInputBox";
import formatDate from "../../components/formatDate";

export default function AnyUserPost() {
  const routerIdParam = useParams();
  const [reloadPost, setReloadPost] = React.useState(false);
  const [post, setPost] = React.useState({
    _id: "",
    parentId: "",
    name: "",
    surname: "",
    profilePicPath: null,
    content: "",
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

  const answerPosts = post.answerPosts.map((answerPost) => {
    return (
      <div key={answerPost._id} className="postpage-post-answers">
        <Link to={"/" + answerPost.ownerId}>
          <img
            className="postpage-post-answers-picture"
            src={answerPost.profilePicPath}
            alt={answerPost.name}
          />
        </Link>
        <div className="postpage-post-answers-content">
          <h3>
            <Link to={"/" + answerPost.ownerId}>
              <b>{answerPost.name}</b>
            </Link>
          </h3>
          <p>{answerPost.content}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="post-feed">
      <div key={post._id} className="postpage-post">
        <div className="postpage-post-content">
          <p>{post.content}</p>
          <small>
            <i>
              ({post.surname.toUpperCase()}, {formatDate(post.date)})
            </i>
          </small>
        </div>
        <PostAnswerInputBox
          postId={routerIdParam.postId}
          setReloadPost={setReloadPost}
        />
      </div>
      {answerPosts}
    </div>
  );
}
