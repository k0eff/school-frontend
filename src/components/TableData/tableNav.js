import React from "react";

import PropTypes from "prop-types";
import tableNavElement from "./tableNavElement";

function tableNav(props) {
  const { meta } = props;

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
            if (meta.minRecordShown && meta.maxRecordShown)
              return `Showing 1 to 10 of ${props.totalRecords} entries`;
            else return `Showing ${props.totalRecords} entries`;
          })()}
        </div>
      </div>
      <div className="col-sm-12 col-md-7">
        <div
          className="dataTables_paginate paging_simple_numbers"
          id="dataTable_paginate"
        >
          <ul className="pagination">
            {(() => {
              return (
                <tableNavElement
                  linkWithoutNumber={meta.link + "/"}
                  linkText="Предишна"
                  pageNumber={meta.prevpage}
                  disabled={meta.prevPage === meta.currPage ? "disabled" : ""}
                  status="previous"
                />
              );
            })()}

            {(() => {
              for (let i = meta.minDisplPage; i <= meta.maxDisplPage; i++) {
                return (
                  <tableNavElement
                    linkWithoutNumber={meta.link + "/"}
                    linkText={i}
                    pageNumber={meta.prevpage}
                    disabled=""
                    status={i === meta.currPage ? "active" : ""}
                  />
                );
              }
            })()}

            {(() => {
              return (
                <tableNavElement
                  linkWithoutNumber={meta.link + "/"}
                  linkText="Следваща"
                  pageNumber={meta.prevpage}
                  disabled={meta.nextPage === meta.currPage ? "disabled" : ""}
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

    link: PropTypes.string.isRequired
  })
};
export default tableNav;
