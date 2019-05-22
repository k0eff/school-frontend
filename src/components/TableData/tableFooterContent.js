import React from "react";
import PropTypes from "prop-types";

function tableFooterContent(props) {
  if (typeof props.headers === "object") {
    return (
      <tr>
        {Object.keys(props.headers).map(item => (
          <th rowSpan="1" colSpan="1" key={item}>
            {props.headers[item].name}
          </th>
        ))}
      </tr>
    );
  } else {
    return (
      <tr>
        <th />
      </tr>
    );
  }
}

tableFooterContent.propTypes = {
  headers: PropTypes.array.isRequired
};

export default tableFooterContent;
