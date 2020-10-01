import React from "react";

import Constants from "../Constants";

interface Props {
  now: number;
  length: number;
  type: string;
}

const ProgressBar:React.FC<Props> = ({ now, length, type }) => {
    const { progressTexts } = Constants;

    const percent = Math.floor((now / length) * 100);

    const text = (function() {
      if(percent < 30) {
        return progressTexts["early"];
      } else if (percent < 70) {
          return progressTexts["middle"];
      } else {
        return progressTexts["late"];
      }
    }());

    return (
      <div className="container">
        <div className="left-side">
          <p className="text">{percent}%</p>
        </div>
        <div className="center-contents">
          <div className="progress-bar">
            <div
              className={`progress-bar-done${type === "values" ? "_v" : "_p"}`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          {percent === 100 ? (
            <p className="text">終了！お疲れ様！</p>
          ) : (
           <p className="text">{text || "Now Loading..."}</p>
          )}
        </div>
        <div className="right-side">
          <p className="text">{`${now} / ${length}`}</p>
        </div>
      </div>
    );
  };

export default ProgressBar;