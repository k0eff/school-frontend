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

export default class AddKeyValuePairs extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <MainBodyContainerWrapper pageTitle="Предмети">
            <p className="m-4">Добавяне на предмет</p>
            <div className="p-5">
              <div className="form-group">
                <CommonInput placeholder="Име" />
                <div className="form-group mt-2">
                  <CommonTextArea placeholder="Кратко описание" />
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
