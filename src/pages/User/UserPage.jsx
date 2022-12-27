import React from "react";
import CardsPanel from "../../components/CardsPanel/CardsPanel";
import UserProfile from "./UserProfile";
import UserFeed from "./UserFeed";

export default function UserPage() {
  return (
    <div className="homepage-flex-container">
      <UserProfile />
      <UserFeed />
      <CardsPanel />
    </div>
  );
}
