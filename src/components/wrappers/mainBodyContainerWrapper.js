import React, { Fragment } from "react";
import PropTypes from "prop-types";

export default function mainBodyContainerWrapper(props) {
  return (
    <Fragment>
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-4 text-gray-800">{props.pageTitle}</h1>
      </div>
      {props.children}
      {/* <!-- /.container-fluid --> */}
    </Fragment>
  );
}

mainBodyContainerWrapper.propTypes = {
  pageTitle: PropTypes.string.isRequired
};
