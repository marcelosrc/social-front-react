import React from "react";
import PostInputBox from "./PostInputBox";
import formatDate from "../../components/FormatDate";

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

  const handlePostRemoval = (postId) => {
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
      <div className="post-profile-content">
        <h3>{post.name}</h3>
        <p>{post.content}</p>
      </div>
      <div className="post-dropdown-panel">
        <div className="post-dropdown-content fade-in">
          <small onClick={() => handlePostRemoval(post._id)}>
            Remover post
          </small>
        </div>
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
