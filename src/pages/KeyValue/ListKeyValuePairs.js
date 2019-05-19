import React, { Component } from "react";
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

class KeyValuePairs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyValue: {
        loading: false,
        signal: false,
        errors: {},
        values: [],
        paramName: ""
      }
    };

    this.tableHeaders = ["Идентификатор", "Стойност", "Описание"];

    if (
      props.match.params.paramName !== undefined &&
      !props.match.params.paramName.match(/[A-Za-z0-9]/)
    ) {
      this.state.paramName = "default";
    } else {
      this.state.paramName = props.match.params.paramName;
    }
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
      props.checkIfParamExists(this.state.paramName);
    }
  }

  render = () => {
    let dataTableWrapperStyles = {
      width: 95 + "%"
    };

    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <MainBodyContainerWrapper pageTitle="Предмети">
            <p className="m-4">Списък с добавени предмети</p>
            <CommonCard
              linkText="Добави"
              link={"/KeyValue/add/" + this.state.paramName}
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
                        data={this.props.keyValue.values}
                        headers={this.tableHeaders}
                        errors={this.props.keyValue.errors}
                      />
                    </div>
                  </div>
                  <TableNav />
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
