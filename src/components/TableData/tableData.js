import React from "react";
import PropTypes from "prop-types";
import Spinner from "../../components/common/Spinner/spinner";
import TableHeaderContent from "./tableHeaderContent";
import TableFooterContent from "./tableFooterContent";
import isEmpty from "../../utils/is-empty";

class TableData extends React.Component {
  tableBody = {};

  render() {
    return (
      <table
        className="table table-bordered dataTable"
        id="dataTable"
        width="100%"
        cellSpacing="0"
        role="grid"
      >
        <thead>
          <TableHeaderContent headers={this.props.headers} />
        </thead>
        <tfoot>
          <TableFooterContent headers={this.props.headers} />
        </tfoot>
        <tbody>
          {(() => {
            let { errors, data } = this.props;

            if (!isEmpty(data)) {
              return (this.tableBody = data.map(item => (
                <tr role="row" className="odd" key={item._id}>
                  <td className="sorting_1">{item._id}</td>
                  <td>{item.value}</td>
                  <td>{item.descr}</td>
                </tr>
              )));
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
