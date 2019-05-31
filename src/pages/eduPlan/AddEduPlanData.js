import React, { Component } from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import {
  getEduPlanDataByEduPlanDataIdAndEduPlanId,
  addEduPlanData
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
import CommonFormErrorMsg from "../../components/common/CommonFormErrorMsg/CommonFormErrorMsg";
import Select from "react-select";

class AddEduPlanData extends Component {
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
      classHours: "",
      classNumber: null,
      subject: null,
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
    let { classHours, subject, classNumber } = this.state;
    let eduPlanId = this.getEduPlanId();
    let eduPlanDataId = this.getEduPlanDataId();
    let error = {};

    //validate data
    if (!classHours) error.classHours = "Моля, въведете стойност.";

    if (
      isEmpty(subject) ||
      (!isEmpty(subject) && !subject.value.match(/.{1,}/))
    )
      //if subject has been edited and set
      error.subject = "Моля, въведете стойност.";

    if (
      isEmpty(classNumber) ||
      (isEmpty(classNumber) && !classNumber.value.match(/.{1,}/))
    )
      //if classNumber has been edited and set
      error.classNumber = "Моля, въведете стойност.";

    //break execution if there are errors
    if (!isEmpty(error)) {
      this.setState({ formError: error });
      return;
    }

    let data = {
      classHours,
      subject: subject.value,
      classNumber: classNumber.value,
      eduPlanId,
      eduPlanDataId
    };
    this.props.addEduPlanData(data);
  }

  initParamDataUpdate = paramName =>
    this.props.shouldILoadParamData(
      paramName,
      this.state.paramData,
      this.state.cacheSecs
    );

  componentDidMount() {
    this.initParamDataUpdate("Subject");
    this.initParamDataUpdate("ClassNumber");
    let eduPlanId = this.getEduPlanId();
    let eduPlanDataId = this.getEduPlanDataId();

    this.props.getEduPlanDataByEduPlanDataIdAndEduPlanId(
      eduPlanId,
      eduPlanDataId
    );
    //TODO: preloading eduPlans from reducer
  }

  componentDidUpdate() {
    if (
      this.getEduPlanDataId() &&
      this.getEduPlanData() &&
      this.state.classNumber === null &&
      this.state.subject === null
    ) {
      this.setState({
        classNumber: {
          label: this.getEduPlanData().classNumber.value,
          value: this.getEduPlanData().classNumber._id
        },
        subject: {
          label: this.getEduPlanData().subject.value,
          value: this.getEduPlanData().subject._id
        },
        classHours: this.getEduPlanData().classHours
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

  getEduPlanDataId = memoize(() => {
    let eduPlanDataId = "";
    if (!isEmpty(this.props.match.params.eduPlanDataId))
      eduPlanDataId = this.props.match.params.eduPlanDataId;
    return eduPlanDataId;
  });

  getEduPlanData = () => {
    let eduPlanDataId = this.getEduPlanDataId();
    let eduPlanDataSingle;
    if (
      !isEmpty(eduPlanDataId) &&
      !isEmpty(this.props.eduPlan.eduPlanData.eduPlanData)
    )
      eduPlanDataSingle = this.props.eduPlan.eduPlanData.eduPlanData.find(
        item => {
          return item._id === eduPlanDataId;
        }
      );

    return eduPlanDataSingle;
  };

  render() {
    let { error, status, loading } = this.props.eduPlan.add;
    let { classNumber, subject, formError } = this.state;
    let success = false;
    let eduPlanId = this.getEduPlanId();

    if (!isEmpty(status)) {
      // New value has been added
      success = true;
      setTimeout(() => {
        window.location.assign("/eduPlanData/list/" + eduPlanId);
      }, 300);
    }

    let classNumberOptions = [];
    if (
      !isEmpty(this.state.paramData) &&
      !isEmpty(this.state.paramData.ClassNumber)
    ) {
      classNumberOptions = this.state.paramData.ClassNumber.data.map(item => {
        return { value: item._id, label: item.value };
      });
    }

    let subjectOptions = [];
    if (
      !isEmpty(this.state.paramData) &&
      !isEmpty(this.state.paramData.Subject)
    ) {
      subjectOptions = this.state.paramData.Subject.data.map(item => {
        return { value: item._id, label: item.value };
      });
    }

    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
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
                  </div>

                  <div className="form-group mt-2">
                    <span>Клас номер</span>
                    <Select
                      options={classNumberOptions}
                      placeholder="Избери..."
                      onChange={value =>
                        this.handleSelectChange(value, "classNumber")
                      }
                      value={classNumber}
                    />
                    {formError && formError.classNumber ? (
                      <div className="text-danger">{formError.classNumber}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <span>Предмет</span>
                    <Select
                      options={subjectOptions}
                      placeholder="Избери..."
                      onChange={value =>
                        this.handleSelectChange(value, "subject")
                      }
                      required="true"
                      value={subject}
                    />
                    {formError && formError.subject ? (
                      <div className="text-danger">{formError.subject}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <CommonInput
                      placeholder="Брой часове*"
                      name="classHours"
                      onChange={this.handleChange.bind(this)}
                      error={
                        formError && formError.classHours
                          ? formError.classHours
                          : ""
                      }
                      pattern="[0-9]+"
                      title="Полето трябва да съдържа само цифри и поне 1 цифра"
                      value={this.state.classHours}
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
  {
    getEduPlanDataByEduPlanDataIdAndEduPlanId,
    shouldILoadParamData,
    addEduPlanData
  }
)(AddEduPlanData);
