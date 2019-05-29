import React, { Component } from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import {
  addEduPlan,
  startSignal,
  finishSignal,
  startSignalAdd,
  finishSignalAdd
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
      paramData: {},
      formError: {}
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
  };

  handleSubmit(e) {
    e.preventDefault();
    let { name, schoolingYear, classLetter } = this.state;
    let error = {};

    //validate data
    if (!name.match(/.{1,}/)) error.name = "Моля, въведете стойност.";

    if (
      isEmpty(schoolingYear) ||
      (!isEmpty(schoolingYear) && !schoolingYear.value.match(/.{1,}/))
    )
      //if schoolingYear has been edited and set
      error.schoolingYear = "Моля, въведете стойност.";

    if (
      isEmpty(classLetter) ||
      (isEmpty(classLetter) && !classLetter.value.match(/.{1,}/))
    )
      //if classLetter has been edited and set
      error.classLetter = "Моля, въведете стойност.";

    //break execution if there are errors
    if (!isEmpty(error)) {
      this.setState({ formError: error });
      return;
    }

    let data = {
      name,
      schoolingYear: schoolingYear.value,
      classLetter: classLetter.value
    };
    this.props.addEduPlan(data);
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
    let { error, status, loading } = this.props.eduPlan.add;
    let { classLetter, schoolingYear, formError } = this.state;
    let success = false;
    if (!isEmpty(status)) {
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
                <div className="form-group w-25">
                  <div className="form-group">
                    <CommonInput
                      placeholder="Име*"
                      name="name"
                      onChange={this.handleChange.bind(this)}
                      error={formError && formError.name ? formError.name : ""}
                      pattern=".+"
                      title="Полето трябва да съдържа поне 1 символ"
                    />
                  </div>

                  <div className="form-group mt-2">
                    <span>Учебна година</span>
                    <Select
                      options={schoolingYearOptions}
                      placeholder="Избери..."
                      onChange={value =>
                        this.handleSelectChange(value, "schoolingYear")
                      }
                      required="true"
                      value={schoolingYear}
                    />
                    {formError && formError.schoolingYear ? (
                      <div className="text-danger">
                        {formError.schoolingYear}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <span>Клас буква</span>
                    <Select
                      options={classLetterOptions}
                      placeholder="Избери..."
                      onChange={value =>
                        this.handleSelectChange(value, "classLetter")
                      }
                      value={classLetter}
                    />
                    {formError && formError.classLetter ? (
                      <div className="text-danger">{formError.classLetter}</div>
                    ) : (
                      ""
                    )}
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
  {
    addEduPlan,
    startSignalAdd,
    finishSignalAdd,
    startSignal,
    finishSignal,
    shouldILoadParamData
  }
)(AddEduPlans);
