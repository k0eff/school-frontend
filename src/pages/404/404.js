import React from "react";
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";

import Menu from "../../components/menu/menu";
import TopBarWrapper from "../../components/wrappers/topBarWrapper";
import MainWrapper from "../../components/wrappers/mainWrapper";

export default function Blank() {
  return (
    <MainWrapper>
      <Menu />

      <TopBarWrapper>
        <MainBodyContainerWrapper pageTitle="Грешка 404">
          <p className="m-4">Страницата не е намерена</p>
        </MainBodyContainerWrapper>
      </TopBarWrapper>
    </MainWrapper>
  );
}
