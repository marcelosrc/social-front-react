export default function PostMenu(props) {
  const handlePostRemoval = () => {
    fetch(`/posts/delete/${props.postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        props.reloadFeed(true);
      });
  };

  return (
    <div className="post-context-menu fade-in">
      <small onClick={handlePostRemoval}></small>
    </div>
  );
}
