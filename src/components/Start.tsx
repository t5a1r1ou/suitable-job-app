import React, { memo } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "./PageHeader";
import StaticStart from "./StaticStart";

import useQuestionsCollect from "../logic/useQuestionsCollect";

import logoTitle from "../images/logo-title.png";
import logoLeft from "../images/logo-item_left.png";
import logoRight from "../images/logo-item_right.png";

const Start: React.FC = memo(() => {
  const history = useHistory();
  const { isLoading, isError } = useQuestionsCollect();
  return (
    <>
      <PageHeader />
      <h1>
        <img src={logoTitle} alt="トップロゴ" />
      </h1>
      <div className="top-logo_flex">
        <img src={logoLeft} alt="ロゴ左" className="top-logo_item" />
        {isError ? (
          <p>
            エラーが発生しています。
            <br />
            再読み込みをしてください。
          </p>
        ) : isLoading ? (
          <p>ロード中。。。</p>
        ) : (
          <p className="btn-start" onClick={() => history.push("/values/top")}>
            始める
          </p>
        )}
        <img src={logoRight} alt="ロゴ右" className="top-logo_item" />
      </div>
      <StaticStart />
    </>
  );
});

export default Start;
