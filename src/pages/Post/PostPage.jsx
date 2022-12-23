import React from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";

const AnyUserProfile = React.lazy(() => import("../AnyUser/AnyUserProfile"));
const PostFeed = React.lazy(() => import("./PostFeed"));

export default function PostPage() {
  const routerIdParam = useParams();
  const [anyUser, setAnyUser] = React.useState({});
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
        fetch("/users/read/" + data.ownerId, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setAnyUser(data);
          });
      });
  }, [routerIdParam.postId]);

  return (
    <div className="homepage-flex-container">
      <React.Suspense
        fallback={
          <div className="profile">
            <LoadingPage />
          </div>
        }
      >
        <AnyUserProfile anyUser={anyUser} />
      </React.Suspense>
      <React.Suspense
        fallback={
          <div className="post-feed">
            <LoadingPage />
          </div>
        }
      >
        <PostFeed post={post} />
      </React.Suspense>
    </div>
  );
}
