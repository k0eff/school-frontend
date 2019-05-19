import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addValue,
  startSignal,
  finishSignal
} from "../../actions/KeyToValueActions";

// load custom components
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";
import MainWrapper from "../../components/wrappers/mainWrapper";
import Menu from "../../components/menu/menu";
import TopBarWrapper from "../../components/wrappers/topBarWrapper";

import ActionButton from "../../components/common/ActionButton/ActionButton";
import CommonInput from "../../components/common/CommonInput/CommonInput";
import CommonTextArea from "../../components/common/CommonTextArea/CommonTextArea";

class AddKeyValuePairs extends Component {
  static propTypes = {
    addValue: PropTypes.func.isRequired,
    startSignal: PropTypes.func.isRequired,
    finishSignal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      paramValue: "",
      paramDescr: "",
      keyValue: {}
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let paramName = "";
    let { paramValue, paramDescr } = this.state;
    if (
      this.props.match.params.paramName !== undefined &&
      !this.props.match.params.paramName.match(/[A-Za-z0-9]/)
    ) {
      paramName = "default";
    } else {
      paramName = this.props.match.params.paramName;
    }

    let data = {
      paramName,
      value: paramValue,
      descr: paramDescr
    };

    this.props.addValue(data);
  }

  render() {
    let error = this.props.keyValue.error;
    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <MainBodyContainerWrapper pageTitle="Предмети">
            <p className="m-4">Добавяне на предмет</p>
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
                  </div>
                  <div className="form-element">
                    <ActionButton text="Запиши" type="submit" />
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
  keyValue: state.keyValue
});

export default connect(
  mapStateToProps,
  { addValue, startSignal, finishSignal }
)(AddKeyValuePairs);
