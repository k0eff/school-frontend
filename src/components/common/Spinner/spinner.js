import React from "react";
import spinner from "./spinner-2.gif";

export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "48px", margin: "auto", display: "block" }}
      />
    </div>
  );
}
