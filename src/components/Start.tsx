import React, { memo } from "react";

import PageHeader from "./PageHeader";
import StaticStart from "./StaticStart";
import StartButton from "./StartButton";

import logoTitle from "../images/logo-title.png";
import logoLeft from "../images/logo-item_left.png";
import logoRight from "../images/logo-item_right.png";

const Start: React.VFC = memo(() => {
  return (
    <>
      <PageHeader />
      <h1>
        <img src={logoTitle} alt="presented by NISSO プチ自分発見診断" />
      </h1>
      <div className="top-logo_flex">
        <img src={logoLeft} alt="" className="top-logo_item" />
        <StartButton />
        <img src={logoRight} alt="" className="top-logo_item" />
      </div>
      <StaticStart />
    </>
  );
});

export default Start;
