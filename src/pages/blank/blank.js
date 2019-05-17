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
        <MainBodyContainerWrapper pageTitle="Празно">
          <p class="m-4">Празна страница</p>
        </MainBodyContainerWrapper>
      </TopBarWrapper>
    </MainWrapper>
  );
}
