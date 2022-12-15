import React from "react";
import { useParams } from "react-router-dom";
import CardsPanel from "../../components/CardsPanel/CardsPanel";

const AnyUserProfile = React.lazy(() => import("../AnyUser/AnyUserProfile"));
const AnyUserFeed = React.lazy(() => import("./AnyUserFeed"));

export default function UserPage() {
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
    <div className="homepage-flex-container fade-in">
      <AnyUserProfile anyUser={anyUser} />
      <AnyUserFeed anyUser={anyUser} />
      <CardsPanel anyUser={anyUser} />
    </div>
  );
}
