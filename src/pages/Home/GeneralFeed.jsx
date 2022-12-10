import React from "react";
import PostInputBox from "./PostInputBox";
import PostMenu from "./PostMenu";
import formatDate from "../../components/formatDate";

export default function GeneralFeed() {
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
      });
  }, [reloadGeneralFeed]);

  const postMenuHandler = (postId) => {
    setPostId(postId);
  };

  const renderedPost = posts.map((post) => (
    <div key={post._id} className="post fade-in">
      <div className="post-profile-picture">
        <img
          width="100"
          height="100"
          src={post.profilePicPath}
          alt={post.name}
        />
        <div className="post-profile">
          <small>{formatDate(post.date)}</small>
        </div>
      </div>
      <div className="post-content">
        <h3>{post.name}</h3>
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
