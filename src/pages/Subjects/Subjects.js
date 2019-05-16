import React, { Fragment } from "react";
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";

export default function Subjects() {
  let dataTableWrapperStyles = {
    width: 95 + "%"
  };

  return (
    <Fragment>
      <MainBodyContainerWrapper pageTitle="Предмети">
        <p className="m-4">Тук настройте всички изучавани предмети</p>
      </MainBodyContainerWrapper>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
              style={dataTableWrapperStyles}
            >
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="dataTables_length" id="dataTable_length">
                    <label>
                      Show{" "}
                      <select
                        name="dataTable_length"
                        aria-controls="dataTable"
                        className="custom-select custom-select-sm form-control form-control-sm"
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>{" "}
                      entries
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div id="dataTable_filter" className="dataTables_filter">
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder=""
                        aria-controls="dataTable"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-bordered dataTable"
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                    role="grid"
                    aria-describedby="dataTable_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="sorting_asc"
                          tabindex="0"
                          aria-controls="dataTable"
                          rowspan="1"
                          colspan="1"
                          aria-sort="ascending"
                          aria-label="Name: activate to sort column descending"
                        >
                          Name
                        </th>
                        <th
                          className="sorting"
                          tabindex="0"
                          aria-controls="dataTable"
                          rowspan="1"
                          colspan="1"
                          aria-label="Position: activate to sort column ascending"
                        >
                          Position
                        </th>
                        <th
                          className="sorting"
                          tabindex="0"
                          aria-controls="dataTable"
                          rowspan="1"
                          colspan="1"
                          aria-label="Salary: activate to sort column ascending"
                        >
                          Salary
                        </th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th rowspan="1" colspan="1">
                          Name
                        </th>
                        <th rowspan="1" colspan="1">
                          Position
                        </th>
                        <th rowspan="1" colspan="1">
                          Office
                        </th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr role="row" className="odd">
                        <td className="sorting_1">Airi Satou</td>
                        <td>Accountant</td>
                        <td>Tokyo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-5">
                  <div
                    className="dataTables_info"
                    id="dataTable_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to 10 of 57 entries
                  </div>
                </div>
                <div className="col-sm-12 col-md-7">
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="dataTable_paginate"
                  >
                    <ul className="pagination">
                      <li
                        className="paginate_button page-item previous disabled"
                        id="dataTable_previous"
                      >
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx="0"
                          tabindex="0"
                          className="page-link"
                        >
                          Previous
                        </a>
                      </li>
                      <li className="paginate_button page-item active">
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx="1"
                          tabindex="0"
                          className="page-link"
                        >
                          1
                        </a>
                      </li>
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx="2"
                          tabindex="0"
                          className="page-link"
                        >
                          2
                        </a>
                      </li>
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx="3"
                          tabindex="0"
                          className="page-link"
                        >
                          3
                        </a>
                      </li>
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx="4"
                          tabindex="0"
                          className="page-link"
                        >
                          4
                        </a>
                      </li>
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx="5"
                          tabindex="0"
                          className="page-link"
                        >
                          5
                        </a>
                      </li>
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx="6"
                          tabindex="0"
                          className="page-link"
                        >
                          6
                        </a>
                      </li>
                      <li
                        className="paginate_button page-item next"
                        id="dataTable_next"
                      >
                        <a
                          href="#"
                          aria-controls="dataTable"
                          data-dt-idx="7"
                          tabindex="0"
                          className="page-link"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
