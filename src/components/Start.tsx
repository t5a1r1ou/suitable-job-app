import React, { memo } from "react";
import { useHistory } from "react-router-dom";

import logoTitle from "../images/logo-title.png";
import logoLeft from "../images/logo-item_left.png";
import logoRight from "../images/logo-item_right.png";

import PageHeader from "./PageHeader";

const Start: React.FC = memo(() => {
  const history = useHistory();
  return (
    <>
      <PageHeader />
      <h1>
        <img src={logoTitle} alt="トップロゴ" />
      </h1>
      <div className="top-logo_flex">
        <img src={logoLeft} alt="ロゴ左" className="top-logo_item" />
        <p className="btn-em" onClick={() => history.push("/values/top")}>
          始める
        </p>
        <img src={logoRight} alt="ロゴ右" className="top-logo_item" />
      </div>
    </>
  );
});

export default Start;
