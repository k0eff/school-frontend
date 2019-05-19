import React from "react";
import PropTypes from "prop-types";

function tableHeaderContent(props) {
  return (
    <tr role="row">
      {Array.isArray(props.headers) && props.headers.length > 0
        ? props.headers.map(item => (
            <th
              className="sorting_asc"
              tabIndex="0"
              aria-controls="dataTable"
              rowSpan="1"
              colSpan="1"
              aria-sort="ascending"
              aria-label={`${item}: activate to sort column descending`}
              key={item}
            >
              {item}
            </th>
          ))
        : " "}
    </tr>
  );
}

tableHeaderContent.propTypes = {
  headers: PropTypes.array.isRequired
};

export default tableHeaderContent;
