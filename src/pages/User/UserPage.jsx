import React from "react";
import UserProfile from "./UserProfile";
import UserFeed from "./UserFeed";
import CardsPanel from "../../components/CardsPanel/CardsPanel";

export default function UserPage() {
  return (
    <div className="homepage-flex-container fade-in">
      <UserProfile />
      <UserFeed />
      <CardsPanel />
    </div>
  );
}
