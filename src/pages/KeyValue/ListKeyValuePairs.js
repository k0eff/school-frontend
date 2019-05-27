import React, { Component } from "react";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  checkIfParamExists,
  startSignal,
  finishSignal,
  getParamValues
} from "../../actions/KeyToValueActions";

import isEmpty from "../../utils/is-empty";

// load custom components
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";
import MainWrapper from "../../components/wrappers/mainWrapper";
import Menu from "../../components/menu/menu";
import TopBarWrapper from "../../components/wrappers/topBarWrapper";
import TableData from "../../components/TableData/tableData";
import TableNav from "../../components/TableData/tableNav";
import TableSearch from "../../components/TableData/tableSearch";
import CommonCard from "../../components/common/CommonCard/CommonCard";

import tableNavigationCalc from "../../components/TableData/tableNavigationCalc";

class KeyValuePairs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyValue: {
        loading: false,
        signal: false,
        errors: {},
        values: []
      },
      linesPerPage: 10,
      pageNum: 1,
      data: [],
      baseLink: "/KeyValue/list/"
    };

    this.tableHeaders = {
      Subject: [
        {
          name: "Идентификатор",
          width: "16%",
          access: "_id"
        },
        {
          name: "Стойност",
          width: "42%",
          access: "value"
        },
        {
          name: "Описание",
          width: "42%",
          access: "descr"
        }
      ]
    };
    this.pageTitles = {
      Subject: {
        title: "Предмети",
        descr: "Списък с добавени предмети"
      },
      ClassNumber: {
        title: "Клас номер",
        descr: "Списък с добавени номера на класове"
      },
      ClassLetter: {
        title: "Клас буква",
        descr: "Списък с добавени буквени обозначения на класове"
      },
      SchoolingYear: {
        title: "Учебна година",
        descr: "Списък с добавени учебни години"
      }
    };

    this.handlePageNumChange.bind(this);
  }

  getParamName = memoize(propsParamName => {
    if (propsParamName !== undefined && !propsParamName.match(/[A-Za-z0-9]/)) {
      return 1;
    } else {
      return propsParamName;
    }
  });

  getLink = memoize(({ paramName, baseLink }) => {
    return baseLink + paramName;
  });

  getPageNum = memoize(({ PropsPageNum }) => {
    // assigns current pageNum if not previously assigned
    if (
      PropsPageNum !== undefined &&
      (typeof PropsPageNum === "number" ||
        (typeof PropsPageNum === "string" && PropsPageNum.match(/[0-9]/)))
    ) {
      return Number.parseInt(PropsPageNum);
    } else {
      return 1;
    }

    //TODO: check how the pageNum could be validated (upon the loaded data)
  });

  getPaginatedData = memoize(PaginationProps => {
    let out = new tableNavigationCalc(
      PaginationProps.initialData,
      PaginationProps.linesPerPage,
      PaginationProps.pageNum
    ).all;
    return out;
  });

  memoizedCheckIfParamExists = memoize(paramName => {
    this.props.checkIfParamExists(paramName);
    return true;
  });

  handlePageNumChange(newPageNum) {
    this.setState({ pageNum: newPageNum });
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEmpty(props.keyValue.values))
      return { ...state, data: props.keyValue.values };
    else return null;
  }

  componentDidMount() {
    let { props } = this;
    if (
      props.keyValue.signal === false &&
      props.keyValue.loading === false &&
      isEmpty(props.keyValue.error) &&
      isEmpty(props.keyValue.params)
    ) {
      props.startSignal();
      const paramName = this.getParamName(this.props.match.params.paramName);

      this.memoizedCheckIfParamExists(paramName);
    }
  }

  componentDidUpdate() {
    const paramName = this.getParamName(this.props.match.params.paramName);
    this.memoizedCheckIfParamExists(paramName);
  }

  render = () => {
    const paramName = this.getParamName(this.props.match.params.paramName);

    const pageNum = this.getPageNum({
      PropsPageNum: this.state.pageNum
    });

    const link = this.getLink({
      paramName: this.props.match.params.paramName,
      baseLink: this.state.baseLink
    });

    let meta = {};
    let data = [];
    let tableNavHtml;

    let paginationData = this.getPaginatedData(
      {
        initialData: this.props.keyValue.values,
        linesPerPage: this.state.linesPerPage,
        pageNum: pageNum
      },
      this.state.returnedDataFromGetPagData
    );

    meta = paginationData.stats;
    meta = { ...meta, link };
    data = paginationData.data;

    tableNavHtml = (
      <TableNav
        meta={meta}
        handlePageNumChange={this.handlePageNumChange.bind(this)}
      />
    );
    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <MainBodyContainerWrapper
            pageTitle={
              this.pageTitles[paramName] ? this.pageTitles[paramName].title : ""
            }
          >
            <p className="m-4">
              {this.pageTitles[paramName]
                ? this.pageTitles[paramName].descr
                : ""}
            </p>
            <CommonCard
              linkText="Добави"
              link={"/KeyValue/add/" + paramName}
              borderLeftClass="border-left-warning"
            />
          </MainBodyContainerWrapper>

          <div className="card shadow mb-4">
            <TableSearch />
            <div className="card-body">
              {tableNavHtml}
              <div className="table-responsive">
                <div
                  id="dataTable_wrapper"
                  className="dataTables_wrapper dt-bootstrap4"
                  style={{ marginRight: "20px" }}
                >
                  <div className="row">
                    <div className="col-sm-12">
                      <TableData
                        data={data}
                        headers={{ ...this.tableHeaders[paramName] }}
                        errors={this.props.keyValue.errors}
                        signal={this.props.keyValue.signal}
                        loading={this.props.keyValue.loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TopBarWrapper>
      </MainWrapper>
    );
  };
}

KeyValuePairs.propTypes = {
  checkIfParamExists: PropTypes.func.isRequired,
  startSignal: PropTypes.func.isRequired,
  finishSignal: PropTypes.func.isRequired,
  getParamValues: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  keyValue: state.keyValue
});

export default connect(
  mapStateToProps,
  { checkIfParamExists, startSignal, finishSignal, getParamValues }
)(KeyValuePairs);
