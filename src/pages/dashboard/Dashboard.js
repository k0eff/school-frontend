import React from "react";
import MainBodyContainerWrapper from "../../components/wrappers/mainBodyContainerWrapper";

import Menu from "../../components/menu/menu";
import TopBarWrapper from "../../components/wrappers/topBarWrapper";
import MainWrapper from "../../components/wrappers/mainWrapper";

export default function Dashboard() {
  return (
    <MainWrapper>
      <Menu />

      <TopBarWrapper>
        <MainBodyContainerWrapper pageTitle="Dashboard">
          <p class="m-4">Добре дошли в началната страница</p>
        </MainBodyContainerWrapper>
      </TopBarWrapper>
    </MainWrapper>
  );
}
