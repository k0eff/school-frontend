import React from "react";

import PropTypes from "prop-types";
import TableNavElement from "./tableNavElement";

import isEmpty from "../../utils/is-empty";

function tableNav(props) {
  const { meta } = props;

  let tableNavMiddle = "";

  return (
    <div className="row">
      <div className="col-sm-12 col-md-5">
        <div
          className="dataTables_info"
          id="dataTable_info"
          role="status"
          aria-live="polite"
        >
          {(() => {
            if (!isEmpty(meta.minRecordShown) && !isEmpty(meta.maxRecordShown))
              return `Показани ${meta.minRecordShown +
                1} до ${meta.maxRecordShown + 1} от ${meta.totalRecords +
                1} записа`;
            else return `Показани ${meta.totalRecords} записа`;
          })()}
        </div>
      </div>
      <div className="col-sm-12 col-md-7">
        <div
          className="dataTables_paginate paging_simple_numbers"
          id="dataTable_paginate"
          style={{ float: "right", marginRight: "20px" }}
        >
          <ul className="pagination">
            {(() => {
              return (
                <TableNavElement
                  linkWithoutNumber={meta.link + "/"}
                  linkText="Предишна"
                  pageNumber={meta.prevPage}
                  disabled={meta.prevPage === meta.currPage ? "disabled" : ""}
                  status="previous"
                  handlePageNumChange={props.handlePageNumChange}
                />
              );
            })()}

            {(() => {
              let out = [];
              for (let i = meta.minPageShown; i <= meta.maxPageShown; i++) {
                out.push(
                  <TableNavElement
                    linkWithoutNumber={meta.link + "/"}
                    linkText={i}
                    pageNumber={i}
                    disabled=""
                    status={i === meta.currPage ? "active" : ""}
                    handlePageNumChange={props.handlePageNumChange}
                    key={i}
                  />
                );
              }
              return out;
            })()}
            {tableNavMiddle}
            {(() => {
              return (
                <TableNavElement
                  linkWithoutNumber={meta.link + "/"}
                  linkText="Следваща"
                  pageNumber={meta.nextPage}
                  disabled={meta.nextPage === meta.currPage ? "disabled" : ""}
                  handlePageNumChange={props.handlePageNumChange}
                  status="next"
                />
              );
            })()}
          </ul>
        </div>
      </div>
    </div>
  );
}

tableNav.propTypes = {
  meta: PropTypes.shape({
    minRecordShown: PropTypes.number, // may not be required if search mode is on
    maxRecordShown: PropTypes.number, // may not be required if search mode is on

    totalRecords: PropTypes.number.isRequired,

    minPageShown: PropTypes.number.isRequired,
    maxPageShown: PropTypes.number.isRequired,

    currPage: PropTypes.number.isRequired,
    prevPage: PropTypes.number.isRequired, // if prevPage === currPage -- the button will be disabled
    nextPage: PropTypes.number.isRequired, // if nextPage === currPage -- the button will be disabled

    link: PropTypes.string.isRequired //no trailing slash "/"
  })
};
export default tableNav;
