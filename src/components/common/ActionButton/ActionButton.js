import React from "react";
import PropTypes from "prop-types";
import SpinnerInline from "../Spinner/spinner-inline";

class ActionButton extends React.Component {
  spinnerElement = null;

  state = {
    displaySpinner: false
  };
  onClickHandler = () => {
    this.setState({ displaySpinner: true }); //only show it, do not hide it on the second click
    // this.props.onClick();
  };

  render() {
    return (
      <div className="form-group">
        <button
          className={
            this.props.className
              ? this.props.className
              : "btn btn-primary btn-icon-split"
          }
          id={this.props.id}
          onClick={() => {
            this.onClickHandler();
          }}
        >
          <span className="icon text-white-50">
            <i className="fas fa-flag" />
          </span>
          <span className="text">{this.props.text}</span>
        </button>

        {(() => {
          if (this.state.displaySpinner) {
            return <SpinnerInline width="32px" className="ml-2" />;
          }
        })()}
      </div>
    );
  }
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  className: PropTypes.string
};

export default ActionButton;
