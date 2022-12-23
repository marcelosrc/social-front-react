import React from "react";
import { Link, useParams } from "react-router-dom";
import PostAnswerInputBox from "../../components/PostAnswerInputBox";
import formatDate from "../../components/formatDate";

export default function PostFeed(props) {
  const routerIdParam = useParams();

  const answerPosts = props.post.answerPosts.map((answerPost) => {
    return (
      <div key={answerPost._id} className="postpage-post-answers">
        <Link to={"/users/" + answerPost.ownerId}>
          <img
            className="postpage-post-answers-picture"
            src={answerPost.profilePicPath}
            alt={answerPost.name}
          />
        </Link>
        <div className="postpage-post-answers-content">
          <p>{answerPost.content}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="post-feed">
      <div key={props.post._id} className="postpage-post">
        <div className="postpage-post-content">
          <p>{props.post.content}</p>
          <small>
            <i>
              ({props.post.surname.toUpperCase()}, {formatDate(props.post.date, "full")}
              )
            </i>
          </small>
        </div>
        {answerPosts}
        <PostAnswerInputBox postId={routerIdParam.postId} />
      </div>
    </div>
  );
}
