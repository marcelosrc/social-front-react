import React from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import CardsPanel from "../../components/CardsPanel/CardsPanel";

const AnyUserProfile = React.lazy(() => import("../AnyUser/AnyUserProfile"));
const AnyUserFeed = React.lazy(() => import("./AnyUserFeed"));

export const AnyUserContext = React.createContext({});

export default function AnyUserPage() {
  const routerIdParam = useParams();
  const [anyUser, setAnyUser] = React.useState({});
  const [reloadAnyUser, setReloadAnyUser] = React.useState(false);

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
        setReloadAnyUser(false);
      });
  }, [reloadAnyUser, routerIdParam.userId]);

  return (
    <AnyUserContext.Provider value={{ anyUser, setReloadAnyUser }}>
      <div className="homepage-flex-container">
        <React.Suspense
          fallback={
            <div className="profile">
              <LoadingPage />
            </div>
          }
        >
          <AnyUserProfile />
        </React.Suspense>
        <React.Suspense
          fallback={
            <div className="generalfeed">
              <LoadingPage />
            </div>
          }
        >
          <AnyUserFeed />
        </React.Suspense>
        <CardsPanel />
      </div>
    </AnyUserContext.Provider>
  );
}
