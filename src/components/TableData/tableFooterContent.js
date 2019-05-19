import React from "react";
import PropTypes from "prop-types";

function tableFooterContent(props) {
  if (Array.isArray(props.headers) && props.headers.length > 0) {
    return (
      <tr>
        {props.headers.map(item => (
          <th rowSpan="1" colSpan="1" key={item}>
            {item}
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
