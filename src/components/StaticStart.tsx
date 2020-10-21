import React, { memo } from "react";
import { useHistory } from "react-router-dom";

const StaticStart = memo(() => {
  const history = useHistory();
  return (
    <>
      <h2 className="static_title">プチ自分発見診断でわかること</h2>
      <p className="static_text">以下の2種類の診断をご用意しています</p>
      <div className="static_box">
        <div className="static_item">
          <h3 className="static_item_title">価値観診断</h3>
          <p className="static_item_desc">
            説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明
          </p>
        </div>
        <div className="static_item">
          <h3 className="static_item_title">性格診断</h3>
          <p className="static_item_desc">
            説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明
          </p>
        </div>
      </div>
      <p className="btn-em" onClick={() => history.push("/values/top")}>
        始める
      </p>
    </>
  );
});

export default StaticStart;
