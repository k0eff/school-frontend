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
      paramName: "",
      linesPerPage: 10,
      pageNum: 1,
      data: [],
      baseLink: "/KeyValue/list/",
      link: ""
    };

    this.tableHeaders = ["Идентификатор", "Стойност", "Описание"];
  }

  getParamName = memoize((propsParamName, stateParamName) => {
    if (propsParamName !== undefined && !propsParamName.match(/[A-Za-z0-9]/)) {
      return 1;
    } else {
      return propsParamName;
    }
  });

  getLink = memoize((propsParamName, stateLink, stateBaseLink) => {
    return stateBaseLink + propsParamName;
  });

  getPageNum = memoize((propsPageNum, statePageNum) => {
    if (propsPageNum !== undefined && !propsPageNum.match(/[A-Za-z0-9]/)) {
      return "default";
    } else {
      return propsPageNum;
    }
  });

  // static getDerivedStateFromProps(props, state) {
  //   //get paramName from url
  //   if (
  //     props.match.params.paramName !== undefined &&
  //     !props.match.params.paramName.match(/[A-Za-z0-9]/)
  //   ) {
  //     state.paramName = "default";
  //   } else {
  //     state.paramName = props.match.params.paramName;
  //   }
  //   // set it to this.state

  //   state.link += this.state.paramName;

  //   //get pageNum from url
  //   if (
  //     props.match.params.pageNum !== undefined &&
  //     !props.match.params.pageNum.match(/[0-9]/)
  //   ) {
  //     state.pageNum = 1;
  //   } else {
  //     state.pageNum = props.match.params.pageNum;
  //   }
  // }

  componentDidMount() {
    let { props } = this;
    if (
      props.keyValue.signal === false &&
      props.keyValue.loading === false &&
      isEmpty(props.keyValue.error) &&
      isEmpty(props.keyValue.params)
    ) {
      props.startSignal();
      const paramName = this.getParamName(
        this.props.match.params.paramName,
        this.state.paramName
      );
      props.checkIfParamExists(paramName);
    }
  }

  render = () => {
    const paramName = this.getParamName(
      this.props.match.params.paramName,
      this.state.paramName
    );

    const pageNum = this.getPageNum(
      this.props.match.params.pageNum,
      this.state.pageNum
    );

    const link = this.getLink(
      this.props.match.params.paramName,
      this.state.link,
      this.state.baseLink
    );

    let meta = {};
    let data = [];
    let tableNavHtml;
    let dataProcessor;

    if (!isEmpty(this.props.keyValue.values)) {
      dataProcessor = new tableNavigationCalc(
        [...this.props.keyValue.values],
        this.state.linesPerPage,
        pageNum
      );

      meta = {
        totalRecords: dataProcessor.totalRecords,
        minPageShown: dataProcessor.minPageShown,
        maxPageShown: dataProcessor.maxPageShown,
        currPage: dataProcessor.currPage,
        prevPage: dataProcessor.prevPage,
        nextPage: dataProcessor.nextPage,
        minRecordShown: dataProcessor.minRecordShown,
        maxRecordShown: dataProcessor.maxRecordShown,
        link
      };

      data = dataProcessor.data;
      tableNavHtml = <TableNav meta={meta} />;
    }

    let dataTableWrapperStyles = {
      width: 95 + "%"
    };
    let values = this.props.keyValue.values;
    let length = 0;
    if (!isEmpty(values)) length = values.length;

    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <MainBodyContainerWrapper pageTitle="Предмети">
            <p className="m-4">Списък с добавени предмети</p>
            <CommonCard
              linkText="Добави"
              link={"/KeyValue/add/" + paramName}
              borderLeftClass="border-left-warning"
            />
          </MainBodyContainerWrapper>

          <div className="card shadow mb-4">
            <TableSearch />
            <div className="card-body">
              <div className="table-responsive">
                <div
                  id="dataTable_wrapper"
                  className="dataTables_wrapper dt-bootstrap4"
                  style={dataTableWrapperStyles}
                >
                  <div className="row">
                    <div className="col-sm-12">
                      <TableData
                        data={data}
                        headers={this.tableHeaders}
                        errors={this.props.keyValue.errors}
                      />
                    </div>
                  </div>
                  {tableNavHtml}
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
