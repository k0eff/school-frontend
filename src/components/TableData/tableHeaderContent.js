import React from "react";
import PropTypes from "prop-types";

function tableHeaderContent(props) {
  // Object.keys(props.headers).map(item => {
  //   console.log(props.headers[item]);
  // });

  return (
    <tr role="row">
      {typeof props.headers === "object"
        ? Object.keys(props.headers).map(item => (
            <th
              className="sorting_asc"
              aria-controls="dataTable"
              rowSpan="1"
              colSpan="1"
              aria-sort="ascending"
              aria-label={`${
                props.headers[item].name
              }: activate to sort column descending`}
              style={{ width: props.headers[item].width }}
              key={item}
            >
              {props.headers[item].name}
            </th>
          ))
        : " "}
    </tr>
  );
}

tableHeaderContent.propTypes = {
  headers: PropTypes.shape({
    
  })
};

export default tableHeaderContent;
