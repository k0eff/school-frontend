import React from "react";
import PropTypes from "prop-types";
import Spinner from "../../components/common/Spinner/spinner";
import TableHeaderContent from "./tableHeaderContent";
import TableFooterContent from "./tableFooterContent";
import isEmpty from "../../utils/is-empty";
import readObjectByString from "../../utils/readObjectByString";
import format from "date-format";

class TableData extends React.Component {
  tableBody = {};

  render() {
    let { errors, signal, loading, headers } = this.props;

    return (
      <table
        className="table table-bordered dataTable"
        id="dataTable"
        width="100%"
        cellSpacing="0"
        role="grid"
      >
        <thead>
          <TableHeaderContent headers={headers} />
        </thead>
        <tfoot>
          <TableFooterContent headers={headers} />
        </tfoot>
        <tbody>
          {(() => {
            let { data } = this.props;
            if (
              !isEmpty(data) &&
              loading === false &&
              signal === true &&
              isEmpty(errors)
            ) {
              return data.map(item => (
                <tr role="row" className="odd" key={item._id}>
                  {!isEmpty(headers)
                    ? Object.keys(headers).map(headerIndex => {
                        let output = readObjectByString(
                          item,
                          headers[headerIndex].access
                        );
                        if (
                          headers[headerIndex] &&
                          headers[headerIndex].date &&
                          headers[headerIndex].date === true
                        ) {
                          return (
                            <td>
                              {format.asString(
                                "dd.MM.yyyy hh:mm:ss",
                                new Date(output)
                              )}
                            </td>
                          );
                        } else {
                          return <td>{output}</td>;
                        }
                      })
                    : ""}
                </tr>
              ));
            }

            if (!isEmpty(errors)) {
              return (
                <tr role="row" className="odd">
                  <td colSpan="3">
                    <div className="alert alert-secondary m-1" role="alert">
                      {errors.error}
                    </div>
                  </td>
                </tr>
              );
            } else if (
              signal === true &&
              loading === false &&
              isEmpty(errors)
            ) {
              return (
                <tr role="row" className="odd">
                  <td colSpan="3">
                    <div className="alert alert-secondary m-1" role="alert">
                      Все още не са добавени данни
                    </div>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr role="row" className="odd" key="SpinnerTr">
                  <td className="sorting_1" colSpan="3" key="SpinnerTd">
                    <Spinner />
                  </td>
                </tr>
              );
            }
          })()}
        </tbody>
      </table>
    );
  }
}

TableData.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.object.isRequired
};

export default TableData;
