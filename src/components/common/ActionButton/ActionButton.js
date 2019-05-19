import React from "react";
import PropTypes from "prop-types";

function ActionButton(props) {
  return (
    <button
      className={
        props.className ? props.className : "btn btn-primary btn-icon-split"
      }
      id={props.id}
      onClick={props.onClick}
    >
      <span class="icon text-white-50">
        <i class="fas fa-flag" />
      </span>
      <span class="text">{props.text}</span>
    </button>
  );
}

ActionButton.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string
};

export default ActionButton;
