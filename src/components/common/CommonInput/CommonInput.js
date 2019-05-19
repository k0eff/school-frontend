import React from "react";
import PropTypes from "prop-types";

function CommonInput(props) {
  return (
    <div className="form-group">
      <input
        type={props.type ? props.type : "text"}
        name={props.name}
        onChange={props.onChange}
        className={
          props.className ? props.className : "form-control form-control-user"
        }
        id={props.id ? props.id : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        required={props.required ? props.required : ""}
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
  type: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.string,
  error: PropTypes.string
};

export default CommonInput;
