import React from "react";
import { Link } from "react-router-dom";
import PostInputBox from "./PostInputBox";
import PostMenu from "../../components/PostMenu";
import formatDate from "../../components/formatDate";

export default function GeneralFeed(props) {
  const [posts, setPosts] = React.useState([
    {
      _id: "",
      parentId: "",
      name: "",
      surname: "",
      profilePicPath: "",
      content: "",
      date: "",
    },
  ]);
  const [reloadGeneralFeed, setReloadGeneralFeed] = React.useState(false);
  const [postId, setPostId] = React.useState("");

  React.useEffect(() => {
    fetch("/queries/generalfeed", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setReloadGeneralFeed(false);
        //props.setReloadCurrentUser(true);
      });
  }, [reloadGeneralFeed]);

  const postMenuHandler = (postId) => {
    setPostId(postId);
  };

  const profileLink = "/users/";
  const renderedPost = posts.map((post) => (
    <div key={post._id} className="post fade-in">
      <div className="post-profile">
        <Link to={profileLink + post.parentId}>
          <img
            className="post-profile-picture"
            width="80"
            height="80"
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
      <div
        className="post-menu"
        onMouseEnter={() => postMenuHandler(post._id)}
        onMouseLeave={() => postMenuHandler(null)}
      >
        {props.currentUser === post.parentId && postId === post._id ? (
          <PostMenu postId={postId} reloadFeed={setReloadGeneralFeed} />
        ) : null}
      </div>
    </div>
  ));
  return (
    <div className="generalfeed">
      <PostInputBox reloadFeed={setReloadGeneralFeed} />
      {renderedPost}
    </div>
  );
}
