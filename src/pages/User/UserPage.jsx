import React from "react";
import LoadingPage from "../../components/LoadingPage";
import CardsPanel from "../../components/CardsPanel/CardsPanel";

const UserProfile = React.lazy(() => import("./UserProfile"));
const UserFeed = React.lazy(() => import("./UserFeed"));

export default function UserPage() {
  return (
    <div className="homepage-flex-container">
      <React.Suspense
        fallback={
          <div className="profile">
            <LoadingPage />
          </div>
        }
      >
        <UserProfile />
      </React.Suspense>
      <React.Suspense
        fallback={
          <div className="generalfeed">
            <LoadingPage />
          </div>
        }
      >
        <UserFeed />
      </React.Suspense>
      <CardsPanel />
    </div>
  );
}
