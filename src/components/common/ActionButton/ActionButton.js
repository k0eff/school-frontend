import React from "react";
import PropTypes from "prop-types";
import SpinnerInline from "../Spinner/spinner-inline";

class ActionButton extends React.Component {
  spinnerElement = null;

  render() {
    let iconElement,
      btnClassName = "";
    let { loading, success } = this.props;

    if (!loading && success) {
      // if the button has finished loading and the action is successful
      iconElement = <i className="fas fa-check" />;
      btnClassName = "btn btn-icon-split btn-success";
    } else if (loading) {
      iconElement = <SpinnerInline width="22px" />;
      btnClassName = "btn btn-icon-split btn-primary";
    } else {
      // standard state
      iconElement = <i className="fas fa-flag" />;
      btnClassName = "btn btn-icon-split btn-primary";
    }

    return (
      <div className="form-group">
        <button
          className={btnClassName}
          id={this.props.id}
          onClick={e => {
            return this.props.onClick ? this.props.onClick() : "";
          }}
          type={this.props.type}
        >
          <span className="icon text-white-50">{iconElement}</span>
          <span className="text">{this.props.text}</span>
        </button>
      </div>
    );
  }
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string
};

export default ActionButton;
