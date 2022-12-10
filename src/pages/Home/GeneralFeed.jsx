import React from "react";
import PostInputBox from "./PostInputBox";
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
  const [contextMenuAnchorPoint, setContextMenuAnchorPoint] = React.useState({
    x: 0,
    y: 0,
  });
  const [showContextMenu, setShowContextMenu] = React.useState(false);
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

  const contextMenu = (postId) => (event) => {
    event.preventDefault();
    setPostId(postId);
    setContextMenuAnchorPoint({ x: event.pageX, y: event.pageY });
    setShowContextMenu(true);
  };

  const handlePostRemoval = () => {
    fetch(`/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReloadGeneralFeed(true);
      });
  };

  const renderedPost = posts.map((post) => (
    <div
      key={post._id}
      className="post fade-in"
      onContextMenu={contextMenu(post._id)}
    >
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
      <div className="post-profile-content">
        <h3>{post.name}</h3>
        <p>{post.content}</p>
      </div>
    </div>
  ));
  return (
    <div className="generalfeed">
      <PostInputBox reloadFeed={setReloadGeneralFeed} />
      {renderedPost}
      {showContextMenu && (
        <div
          className="context-menu fade-in"
          style={{
            top: contextMenuAnchorPoint.y,
            left: contextMenuAnchorPoint.x,
          }}
        >
          <small onClick={handlePostRemoval}>Remover Post</small>
        </div>
      )}
    </div>
  );
}
