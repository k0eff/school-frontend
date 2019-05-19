import React, { Component } from "react";
import PropTypes from "prop-types";

// load custom components
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";
import MainWrapper from "../../components/wrappers/mainWrapper";
import Menu from "../../components/menu/menu";
import TopBarWrapper from "../../components/wrappers/topBarWrapper";

import ActionButton from "../../components/common/ActionButton/ActionButton";
import CommonInput from "../../components/common/CommonInput/CommonInput";
import CommonTextArea from "../../components/common/CommonTextArea/CommonTextArea";
import SpinnerInline from "../../components/common/Spinner/spinner-inline";

export default class AddKeyValuePairs extends Component {
  static propTypes = {
    prop: PropTypes
  };

  constructor(props) {
    super(props);
    this.state = {
      ParamValue: "",
      ParamDescr: ""
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <MainBodyContainerWrapper pageTitle="Предмети">
            <p className="m-4">Добавяне на предмет</p>
            <div className="p-5">
              <div className="form-group">
                <CommonInput
                  placeholder="Име"
                  name="ParamValue"
                  onChange={this.handleChange.bind(this)}
                />
                <div className="form-group mt-2">
                  <CommonTextArea
                    placeholder="Кратко описание"
                    name="ParamDescr"
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className="form-element">
                  <ActionButton text="Запиши" />
                </div>
              </div>
            </div>
          </MainBodyContainerWrapper>
        </TopBarWrapper>
      </MainWrapper>
    );
  }
}
