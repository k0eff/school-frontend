import React from "react";
import PropTypes from "prop-types";

function CommonFormErrorMsg(props) {
  return (
    <div className="form-group mt-2">
      <div
        className="text-danger"
        style={{ display: props.error ? "block" : "none" }}
      >
        <span>{typeof props.error === "string" ? props.error : ""}</span>
      </div>
    </div>
  );
}

CommonFormErrorMsg.propTypes = {
  display: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default CommonFormErrorMsg;
