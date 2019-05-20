import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function tableNavElement(props) {
  let { disabled, status, linkWithoutNumber, linkText, pageNumber } = props;

  let liClassName = "paginate_button page-item ";
  liClassName += status;
  liClassName += disabled;

  return (
    <li className={liClassName} id="dataTable_previous">
      <Link
        to={linkWithoutNumber + pageNumber}
        aria-controls="dataTable"
        data-dt-idx="0"
        tabIndex="0"
        className="page-link"
      >
        {linkText}
      </Link>
    </li>
  );
}

tableNavElement.propTypes = {
  disabled: PropTypes.oneOf(["disabled", ""]).isRequired,
  status: PropTypes.oneOf(["previous", "next", "active", ""]).isRequired,
  linkWithoutNumber: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired
};

export default tableNavElement;
