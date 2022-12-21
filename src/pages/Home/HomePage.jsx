import React from "react";
import Header from "./Header";

export default function HomePage(props) {
  return (
    <>
      <Header />
      {props.page}
    </>
  );
}
