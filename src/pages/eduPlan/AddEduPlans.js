import React, { Component } from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import {
  addEduPlan,
  startSignal,
  finishSignal,
  startSignalAdd,
  finishSignalAdd,
  getEduPlanSingleById
} from "../../actions/EduPlanActions";

import { shouldILoadParamData } from "../../actions/KeyToValueActions";

import isEmpty from "../../utils/is-empty";

// load custom components
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";

import ActionButton from "../../components/common/ActionButton/ActionButton";
import CommonInput from "../../components/common/CommonInput/CommonInput";
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
    let eduPlanId = this.getEduPlanId();
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
      classLetter: classLetter.value,
      eduPlanId
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
    let eduPlanId = this.getEduPlanId();
    if (!isEmpty(eduPlanId)) {
      let eduPlansPreloaded = [];
      if (!isEmpty(this.props.eduPlan.data))
        eduPlansPreloaded = this.props.eduPlan.data;
      this.props.getEduPlanSingleById(eduPlanId, eduPlansPreloaded);
    }
  }

  componentDidUpdate() {
    if (
      this.getEduPlanSingle() &&
      this.state.classLetter === null &&
      this.state.schoolingYear === null
    ) {
      this.setState({
        classLetter: {
          label: this.getEduPlanSingle().classLetter.value,
          value: this.getEduPlanSingle().classLetter._id
        },
        schoolingYear: {
          label: this.getEduPlanSingle().schoolingYear.value,
          value: this.getEduPlanSingle().schoolingYear._id
        },
        name: this.getEduPlanSingle().name
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    let newState = null;

    if (!isEmpty(props.keyValue.data))
      newState = { ...newState, paramData: props.keyValue.data };

    return newState;
  }

  getEduPlanId = memoize(() => {
    let eduPlanId = "";
    if (!isEmpty(this.props.match.params.eduPlanId))
      eduPlanId = this.props.match.params.eduPlanId;
    return eduPlanId;
  });

  getEduPlanSingle = () => {
    let eduPlanId = this.getEduPlanId();
    let eduPlanSingle;
    if (!isEmpty(this.props.eduPlan.single)) {
      eduPlanSingle = this.props.eduPlan.single.eduPlan.find(item => {
        return item._id === eduPlanId;
      });
    }
    return eduPlanSingle;
  };

  render() {
    let { error, status, loading } = this.props.eduPlan.add;
    let { classLetter, schoolingYear, formError } = this.state;
    let success = false;
    let eduPlanId = this.getEduPlanId();

    if (!isEmpty(status)) {
      // New value has been added
      success = true;
      setTimeout(() => {
        window.location.assign("/eduPlan/list/");
      }, 300);
    }

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
      <MainBodyContainerWrapper pageTitle="Учебни планове">
        <p className="m-4">
          {eduPlanId ? "Редакция" : "Добавяне"} на учебен план
        </p>
        <div className="p-5">
          <form
            onSubmit={e => {
              this.handleSubmit(e);
            }}
          >
            <div className="form-group w-25">
              <div className="form-group">
                {!isEmpty(this.props.eduPlan.single.errors) ? (
                  <div className="alert bg-gradient-warning text-gray-700">
                    Избраният учебен план не съществува. <br />
                    Ще бъде добавен нов с въведените данни.
                  </div>
                ) : (
                  ""
                )}
                <CommonInput
                  placeholder="Име*"
                  name="name"
                  onChange={this.handleChange.bind(this)}
                  error={formError && formError.name ? formError.name : ""}
                  pattern=".+"
                  title="Полето трябва да съдържа поне 1 символ"
                  value={this.state.name}
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
                  <div className="text-danger">{formError.schoolingYear}</div>
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
    shouldILoadParamData,
    getEduPlanSingleById
  }
)(AddEduPlans);
