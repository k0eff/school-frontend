import React from "react";
import PropTypes from "prop-types";

function CommonInput(props) {
  return (
    <div className="form-group">
      <textarea
        name={props.name}
        onChange={props.onChange}
        className={
          props.className ? props.className : "form-control form-control-user"
        }
        id={props.id ? props.id : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
      />
      <div
        className="text-danger"
        style={{ display: props.error ? "block" : "none" }}
      >
        <span>{props.error ? props.error : ""}</span>
      </div>
    </div>
  );
}

CommonInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string
};

export default CommonInput;
