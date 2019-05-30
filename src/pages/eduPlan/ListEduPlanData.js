import React, { Component } from "react";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEduPlanDataByEduPlanId } from "../../actions/EduPlanActions";

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

class EduPlanData extends Component {
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
      baseLink: "/eduPlanData/list/"
    };

    this.tableHeaders = [
      {
        name: "Идентификатор",
        width: "15%",
        access: "_id"
      },
      {
        name: "Учебен план",
        width: "30%",
        access: "eduPlan.name"
      },
      {
        name: "Предмет",
        width: "30%",
        access: "subject.value"
      },
      {
        name: "Клас номер",
        width: "20%",
        access: "classNumber.value"
      },
      {
        name: "Последно редактирано",
        width: "15%",
        access: "updatedAt",
        date: true
      }
    ];

    this.pageTitle = {
      title: "Учебни планове",
      descr: "Списък с данни за учебен план"
    };

    this.handlePageNumChange.bind(this);
  }

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

  getEduPlanId = memoize(() => {
    let eduPlanId = "";
    if (!isEmpty(this.props.match.params.eduPlanId))
      eduPlanId = this.props.match.params.eduPlanId;
    return eduPlanId;
  });

  handlePageNumChange(newPageNum) {
    this.setState({ pageNum: newPageNum });
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEmpty(props.eduPlan.eduPlanData.eduPlanData))
      return { ...state, data: props.eduPlan.eduPlanData.eduPlanData };
    else return null;
  }

  componentDidMount() {
    let { props } = this;
    let eduPlanId = this.getEduPlanId();
    if (
      props.eduPlan.signal === false &&
      props.eduPlan.loading === false &&
      isEmpty(props.eduPlan.error) &&
      isEmpty(props.eduPlan.params)
    ) {
      this.props.getEduPlanDataByEduPlanId(eduPlanId); //load the data
    }
  }

  render = () => {
    const pageNum = this.getPageNum({
      pageNum: this.state.pageNum
    });

    let eduPlanId = this.getEduPlanId();

    const link = this.state.baseLink;

    let meta = {};
    let data = [];

    let paginationData = this.getPaginatedData({
      initialData: this.state.data,
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
              link={"/eduPlanData/addEdit/" + eduPlanId}
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

EduPlanData.propTypes = {
  getEduPlanDataByEduPlanId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  eduPlan: state.eduPlan
});

export default connect(
  mapStateToProps,
  { getEduPlanDataByEduPlanId }
)(EduPlanData);
