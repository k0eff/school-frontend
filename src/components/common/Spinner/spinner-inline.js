import React from "react";
import spinner from "./spinner-2.gif";
import PropTypes from "prop-types";

export default function SpinnerInline(props) {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: props.width, margin: "auto", display: "inline" }}
      className={props.className ? props.className : ""}
    />
  );
}
SpinnerInline.propTypes = {
  width: PropTypes.string.isRequired,
  className: PropTypes.string
};
