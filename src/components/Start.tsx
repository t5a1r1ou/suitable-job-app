import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import loadable from "@loadable/component";

const PageHeader = loadable(() => import("./PageHeader"));
const StaticStart = loadable(() => import("./StaticStart"));

interface TopImg {
  logoTitle: string;
  logoLeft: string;
  logoRight: string;
}

interface Props {
  topImg: TopImg;
}

const Start: React.FC<Props> = memo(({ topImg }) => {
  const history = useHistory();
  const { logoTitle, logoLeft, logoRight } = topImg;
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
      <StaticStart />
    </>
  );
});

export default Start;
