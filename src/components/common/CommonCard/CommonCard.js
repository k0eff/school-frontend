import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CommonCard = props => {
  let classNameCard = props.borderLeftClass
    ? "card shadow h-100 " + props.borderLeftClass
    : "card shadow h-100 border-left-info";

  return (
    <div className="col-lg-2 col-md-6 mb-4">
      <div className={classNameCard}>
        <div className="card-body p-2">
          <div className="row no-gutters align-items-center">
            <div className="col">
              <Link
                to={props.link}
                className="text-xs font-weight-bold text-info text-uppercase "
                style={{ textDecoration: "inherit" }}
              >
                <div className="text-xs font-weight-bold text-info text-uppercase ">
                  {props.linkText}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommonCard.propTypes = {
  link: PropTypes.string.isRequired,
  borderLeftClass: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
};

export default CommonCard;
