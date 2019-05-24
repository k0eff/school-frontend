import React, { Component } from "react";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEduPlans } from "../../actions/EduPlanActions";

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

class EduPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eduPlan: {
        loading: false,
        signal: false,
        errors: {},
        data: []
      },
      linesPerPage: 10,
      pageNum: 1,
      data: [],
      baseLink: "/eduPlan/list/"
    };

    this.tableHeaders = [
      {
        name: "Идентификатор",
        width: "16%"
      },
      {
        name: "Стойност",
        width: "42%"
      },
      {
        name: "Описание",
        width: "42%"
      }
    ];

    this.pageTitle = {
      title: "Учебни планове",
      descr: "Списък с добавени учебни планове"
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

  getPageNum = memoize(({ pageNum }) => {
    // assigns current pageNum if not previously assigned
    if (
      pageNum !== undefined &&
      (typeof pageNum === "number" ||
        (typeof pageNum === "string" && pageNum.match(/[0-9]/)))
    ) {
      return Number.parseInt(pageNum);
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
    if (!isEmpty(props.eduPlan.data))
      return { ...state, data: props.eduPlan.data };
    else return null;
  }

  componentDidMount() {
    let { props } = this;
    if (
      props.eduPlan.signal === false &&
      props.eduPlan.loading === false &&
      isEmpty(props.eduPlan.error) &&
      isEmpty(props.eduPlan.params)
    ) {
      this.props.getEduPlans(); //load the data
    }
  }

  render = () => {
    const pageNum = this.getPageNum({
      CurrPageNum: this.state.pageNum
    });

    const link = this.state.baseLink;

    let meta = {};
    let data = [];

    let paginationData = this.getPaginatedData({
      initialData: this.props.eduPlan.data,
      linesPerPage: this.state.linesPerPage,
      pageNum: pageNum
    });

    meta = paginationData.stats;
    meta = { ...meta, link };
    data = paginationData.data;

    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <MainBodyContainerWrapper
            pageTitle={this.pageTitle ? this.pageTitle.title : ""}
          >
            <p className="m-4">{this.pageTitle ? this.pageTitle.descr : ""}</p>
            <CommonCard
              linkText="Добави"
              link={"/eduPlan/add/"}
              borderLeftClass="border-left-warning"
            />
          </MainBodyContainerWrapper>

          <div className="card shadow mb-4">
            <TableSearch />
            <div className="card-body">
              <TableNav
                meta={meta}
                handlePageNumChange={this.handlePageNumChange.bind(this)}
              />
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
                        headers={{ ...this.tableHeaders }}
                        errors={this.props.eduPlan.errors}
                        signal={this.props.eduPlan.signal}
                        loading={this.props.eduPlan.loading}
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

EduPlan.propTypes = {
  getEduPlans: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  eduPlan: state.eduPlan
});

export default connect(
  mapStateToProps,
  { getEduPlans }
)(EduPlan);