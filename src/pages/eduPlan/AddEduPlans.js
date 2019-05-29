import React, { Component } from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import {
  addEduPlan,
  startSignal,
  finishSignal
} from "../../actions/EduPlanActions";

import { shouldILoadParamData } from "../../actions/KeyToValueActions";

import isEmpty from "../../utils/is-empty";

// load custom components
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";
import MainWrapper from "../../components/wrappers/mainWrapper";
import Menu from "../../components/menu/menu";
import TopBarWrapper from "../../components/wrappers/topBarWrapper";

import ActionButton from "../../components/common/ActionButton/ActionButton";
import CommonInput from "../../components/common/CommonInput/CommonInput";
import CommonTextArea from "../../components/common/CommonTextArea/CommonTextArea";
import CommonFormErrorMsg from "../../components/common/CommonFormErrorMsg/CommonFormErrorMsg";
import Select from "react-select";

class AddEduPlans extends Component {
  static propTypes = {
    addEduPlan: PropTypes.func.isRequired,
    startSignal: PropTypes.func.isRequired,
    finishSignal: PropTypes.func.isRequired,
    add: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      value: PropTypes.object.isRequired,
      error: PropTypes.object.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      classLetter: null,
      schoolingYear: null,
      paramData: {}
    };

    this.handleChange.bind(this);
    this.handleSelectChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelectChange = (paramValue, paramName) => {
    this.setState({ [paramName]: paramValue });
    console.log(`Option selected:`, paramValue);
  };

  handleSubmit(e) {
    e.preventDefault();
    let { name, schoolingYear, classLetter } = this.state;

    let data = {
      name,
      schoolingYear,
      classLetter
    };

    this.props.addValue(data);
  }

  initParamDataUpdate = paramName =>
    this.props.shouldILoadParamData(
      paramName,
      this.state.paramData,
      this.state.cacheSecs
    );

  componentDidMount() {
    this.initParamDataUpdate("SchoolingYear");
    this.initParamDataUpdate("ClassLetter");
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEmpty(props.keyValue.data))
      return { ...state, paramData: props.keyValue.data };
    else return null;
  }

  render() {
    let { error, value, loading } = this.props.eduPlan.add;
    const { classLetter, schoolingYear } = this.state;
    let success = false;
    if (!isEmpty(value)) {
      // New value has been added
      success = true;
      setTimeout(() => {
        window.location.assign("/eduPlan/list/");
      }, 300);
    }

    // const options = [
    //   { value: "chocolate", label: "Chocolate" },
    //   { value: "strawberry", label: "Strawberry" },
    //   { value: "vanilla", label: "Vanilla" }
    // ];

    let classLetterOptions = [];
    if (
      !isEmpty(this.state.paramData) &&
      !isEmpty(this.state.paramData.ClassLetter)
    ) {
      classLetterOptions = this.state.paramData.ClassLetter.data.map(item => {
        return { value: item._id, label: item.value };
      });
    }

    let schoolingYearOptions = [];
    if (
      !isEmpty(this.state.paramData) &&
      !isEmpty(this.state.paramData.SchoolingYear)
    ) {
      schoolingYearOptions = this.state.paramData.SchoolingYear.data.map(
        item => {
          return { value: item._id, label: item.value };
        }
      );
    }

    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <MainBodyContainerWrapper pageTitle="Учебни планове">
            <p className="m-4">Добавяне на учебен план</p>
            <div className="p-5">
              <form
                onSubmit={e => {
                  this.handleSubmit(e);
                }}
              >
                <div className="form-group">
                  <CommonInput
                    placeholder="Име*"
                    name="name"
                    onChange={this.handleChange.bind(this)}
                    error={error && error.value ? error.value : ""}
                    required={true}
                    pattern=".+"
                    title="Полето трябва да съдържа поне 1 символ"
                  />
                  <div className="form-group mt-2">
                    <CommonTextArea
                      placeholder="Кратко описание*"
                      name="paramDescr"
                      onChange={this.handleChange.bind(this)}
                      error={error && error.descr ? error.value : ""}
                      required={true}
                      pattern=".+"
                      title="Полето трябва да съдържа поне 1 символ"
                    />
                    <Select
                      options={schoolingYearOptions}
                      className="w-25 mb-3"
                      placeholder="Избери..."
                      onChange={value =>
                        this.handleSelectChange(value, "schoolingYear")
                      }
                      value={schoolingYear}
                    />
                    <Select
                      options={classLetterOptions}
                      className="w-25"
                      placeholder="Избери..."
                      onChange={value =>
                        this.handleSelectChange(value, "classLetter")
                      }
                      value={classLetter}
                    />
                  </div>

                  <CommonFormErrorMsg
                    error={
                      error && error.error && typeof error.error === "string"
                        ? error.error
                        : ""
                    }
                  />

                  <div className="form-element">
                    <ActionButton
                      text="Запиши"
                      type="submit"
                      loading={loading}
                      success={success}
                    />
                  </div>
                </div>
              </form>
            </div>
          </MainBodyContainerWrapper>
        </TopBarWrapper>
      </MainWrapper>
    );
  }
}

const mapStateToProps = state => ({
  eduPlan: state.eduPlan,
  keyValue: state.keyValue
});

export default connect(
  mapStateToProps,
  { addEduPlan, startSignal, finishSignal, shouldILoadParamData }
)(AddEduPlans);
