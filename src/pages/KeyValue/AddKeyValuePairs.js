import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addValue,
  startSignal,
  finishSignal
} from "../../actions/KeyToValueActions";

import isEmpty from "../../utils/is-empty";

// load custom components
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";

import ActionButton from "../../components/common/ActionButton/ActionButton";
import CommonInput from "../../components/common/CommonInput/CommonInput";
import CommonTextArea from "../../components/common/CommonTextArea/CommonTextArea";
import CommonFormErrorMsg from "../../components/common/CommonFormErrorMsg/CommonFormErrorMsg";

class AddKeyValuePairs extends Component {
  static propTypes = {
    addValue: PropTypes.func.isRequired,
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
      paramValue: "",
      paramDescr: "",
      keyValue: {},
      paramName: ""
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

    this.handleChange.bind(this);

    let { paramName } = this.props.match.params;
    if (paramName !== undefined && !paramName.match(/[A-Za-z0-9]/)) {
      this.state.paramName = "default";
    } else {
      this.state.paramName = paramName;
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { paramValue, paramDescr, paramName } = this.state;

    let data = {
      paramName,
      value: paramValue,
      descr: paramDescr
    };

    this.props.addValue(data);
  }

  render() {
    let { error, value, loading } = this.props.keyValue.add;
    let { paramName } = this.state;
    let success = false;
    if (!isEmpty(value)) {
      // New value has been added
      success = true;
      setTimeout(() => {
        window.location.assign("/KeyValue/list/" + this.state.paramName);
      }, 300);
    }

    return (
      <MainBodyContainerWrapper
        pageTitle={
          this.pageTitles[paramName] ? this.pageTitles[paramName].title : ""
        }
      >
        <p className="m-4">
          {this.pageTitles[paramName] ? this.pageTitles[paramName].descr : ""}
        </p>
        <div className="p-5">
          <form
            onSubmit={e => {
              this.handleSubmit(e);
            }}
          >
            <div className="form-group">
              <CommonInput
                placeholder="Име*"
                name="paramValue"
                onChange={e => this.handleChange(e)}
                error={error && error.value ? error.value : ""}
                required={true}
                pattern=".+"
                title="Полето трябва да съдържа поне 1 символ"
                value={this.state.paramValue}
              />
              <div className="form-group mt-2">
                <CommonTextArea
                  placeholder="Кратко описание*"
                  name="paramDescr"
                  onChange={e => this.handleChange(e)}
                  error={error && error.descr ? error.value : ""}
                  required={true}
                  pattern=".+"
                  title="Полето трябва да съдържа поне 1 символ"
                  value={this.state.paramDescr}
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
    );
  }
}

const mapStateToProps = state => ({
  keyValue: state.keyValue
});

export default connect(
  mapStateToProps,
  { addValue, startSignal, finishSignal }
)(AddKeyValuePairs);
