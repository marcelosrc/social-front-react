import React from "react";
import { Link } from "react-router-dom";
import PostInputBox from "./PostInputBox";
import PostMenu from "../../components/PostMenu";
import formatDate from "../../components/formatDate";

export default function GeneralFeed(props) {
  const [posts, setPosts] = React.useState([
    {
      _id: "",
      name: "",
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
      <div>
        <Link to={profileLink + post.parentId}>
          <img
            className="post-profile-picture"
            width="100"
            height="100"
            src={post.profilePicPath}
            alt={post.name}
          />
        </Link>
        <div className="post-profile">
          <small className="gray">{formatDate(post.date)}</small>
        </div>
      </div>
      <div className="post-content">
        <Link to={profileLink + post.parentId}>
          <h3>{post.name}</h3>
        </Link>
        <p>{post.content}</p>
      </div>
      <div
        className="post-right-padding"
        onMouseEnter={() => postMenuHandler(post._id)}
        onMouseLeave={() => postMenuHandler(null)}
      >
        {postId === post._id ? (
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
