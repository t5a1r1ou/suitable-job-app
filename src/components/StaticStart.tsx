import React, { memo } from "react";

const StaticStart = memo(() => {
  return (
    <>
      <h2 className="static_title">プチ自分発見診断でわかること</h2>
      <p className="static_text">以下の2種類の診断をご用意しています</p>
      <div className="static_box">
        <div className="static_item">
          <h3 className="static_item_title">{"価値観診断で\nわかること"}</h3>
          <p className="static_item_desc">
            お仕事に求める価値観や、どのような働き方を重視しているかなどの嗜好性を判定します。
          </p>
        </div>
        <div className="static_item">
          <h3 className="static_item_title">{"性格診断で\nわかること"}</h3>
          <p className="static_item_desc">
            自分がどんなタイプなのか、強みと弱い部分や自身では気づけなかった正確を判定します。
          </p>
        </div>
      </div>
    </>
  );
});

export default StaticStart;
