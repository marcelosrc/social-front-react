import React from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import CardsPanel from "../../components/CardsPanel/CardsPanel";

const AnyUserProfile = React.lazy(() => import("../AnyUser/AnyUserProfile"));
const AnyUserFeed = React.lazy(() => import("./AnyUserFeed"));

export default function AnyUserPage() {
  const routerIdParam = useParams();
  const [anyUser, setAnyUser] = React.useState({});

  React.useEffect(() => {
    fetch("/users/read/" + routerIdParam.userId, {
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
  }, [routerIdParam.userId]);

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
          <div className="generalfeed">
            <LoadingPage />
          </div>
        }
      >
        <AnyUserFeed anyUser={anyUser} />
      </React.Suspense>
      <CardsPanel anyUser={anyUser} />
    </div>
  );
}
