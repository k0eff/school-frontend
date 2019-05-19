import React from "react";
import PropTypes from "prop-types";

function CommonInput(props) {
  return (
    <input
      type={props.type ? props.type : "text"}
      className={
        props.className ? props.className : "form-control form-control-user"
      }
      id={props.id ? props.id : ""}
      placeholder={props.placeholder ? props.placeholder : ""}
    />
  );
}

CommonInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string
};

export default CommonInput;
