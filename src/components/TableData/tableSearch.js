import React, { Fragment } from "react";

function tableSearch(props) {
  return (
    <Fragment>
      <div className="card-header py-3">
        <div id="dataTable_filter" className="dataTables_filter w-50">
          <label className="w-100">
            Търсене във всички колони:
            <input
              type="search"
              className="form-control form-control-sm w-100"
              placeholder=""
              aria-controls="dataTable"
            />
          </label>
        </div>
      </div>
    </Fragment>
  );
}

export default tableSearch;
