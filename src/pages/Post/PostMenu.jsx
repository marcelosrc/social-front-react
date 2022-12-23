export default function PostMenu(props) {
  const handlePostRemoval = () => {
    fetch("/posts/delete/" + props.postId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <div className="post-context-menu">
      <small onClick={handlePostRemoval}>PRECISA CONSERTAR ISSO AQUI</small>
    </div>
  );
}
