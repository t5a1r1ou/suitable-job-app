import React, { memo } from "react";

import Constants from "../Constants";

interface Props {
  now: number;
  length: number;
  type: string;
}

const ProgressBar: React.FC<Props> = memo(({ now, length, type }) => {
  const { progressTexts, progressWaitTexts } = Constants;

  const percent = Math.floor((now / length) * 100);

  const text = (function () {
    const texts = type !== "waiting" ? progressTexts : progressWaitTexts;
    if (percent < 30) {
      return texts["early"];
    } else if (percent < 70) {
      return texts["middle"];
    } else {
      return texts["late"];
    }
  })();

  const type_flag = (function () {
    if (type === "values") {
      return "_v";
    } else if (type === "personality") {
      return "_p";
    } else if (type === "waiting") {
      return "_w";
    }
  })();

  return (
    <div className="container">
      <div className="left-side">
        <p className="text">{percent}%</p>
      </div>
      <div className="center-contents">
        <div className="progress-bar">
          <div
            className={`progress-bar-done${type_flag}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        {percent === 100 ? (
          <p className="text">
            {type !== "waiting" ? "終了！お疲れ様！" : "診断完了！"}
          </p>
        ) : (
          <p className="text">{text}</p>
        )}
      </div>
      {type !== "waiting" && (
        <div className="right-side">
          <p className="text">{`${now} / ${length}`}</p>
        </div>
      )}
    </div>
  );
});

export default ProgressBar;
