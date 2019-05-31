import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner/spinner";
import TableHeaderContent from "./tableHeaderContent";
import TableFooterContent from "./tableFooterContent";
import isEmpty from "../../utils/is-empty";
import readObjectByString from "../../utils/readObjectByString";
import format from "date-format";
import evaluateStrLiteral from "../../utils/evaluateStrLiteral";

class TableData extends React.Component {
  tableBody = {};

  render() {
    let {
      errors,
      signal,
      loading,
      headers,
      data,
      additionalParams
    } = this.props;

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
                        if (!isEmpty(additionalParams)) {
                          //join the data object and the additionalParams object
                          item = { ...item, ...additionalParams };
                        }

                        let output = readObjectByString(
                          item,
                          headers[headerIndex].access
                        );

                        let link = headers[headerIndex].link;

                        if (!isEmpty(link)) {
                          link = evaluateStrLiteral(link, item);
                        } //process the supplied link parameter from props. It may contain parameters in each data line or in additional params. All possible params are join in item

                        if (
                          headers[headerIndex] &&
                          headers[headerIndex].date &&
                          headers[headerIndex].date === true
                        ) {
                          return (
                            <td key={item._id + "_td_" + headerIndex}>
                              {format.asString(
                                "dd.MM.yyyy hh:mm:ss",
                                new Date(output)
                              )}
                            </td>
                          );
                        } else {
                          return (
                            <td key={item._id + "_td_" + headerIndex}>
                              {link ? ( // add a link if it has been supplied
                                <Link to={link}>{output}</Link>
                              ) : (
                                output
                              )}
                            </td>
                          );
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
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      //headers should be an array casted to an object
      width: PropTypes.string,
      access: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.bool,
      link: PropTypes.string, //link is to be added in order to add it to the specified cell
      additionalParams: PropTypes.object //additional params serve to be added to each line of data in order to evaluate them when needed
      // Make sure none of the properties in the supplied additional params object === any of the properties of the data object
    })
  )
};

export default TableData;
