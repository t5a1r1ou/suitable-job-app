import React, { memo } from "react";

import useWaiter from "../logic/useWaiter";

import Progressbar from "./ProgressBar";

import docWaiting from "../images/doctor3.png";
import docWaited from "../images/doctor4.png";

interface WaitObj {
  waiting: {
    img: string;
    text: string;
  };
  waited: {
    img: string;
    text: string;
  };
}

const WaitResult: React.FC = memo(() => {
  const waitObj: WaitObj = {
    waiting: {
      img: docWaiting,
      text: "結果計算中…",
    },
    waited: {
      img: docWaited,
      text: "結果計算完了！",
    },
  };

  const { wait, now } = useWaiter(waitObj);

  return (
    <div className="wait_box">
      <h1 className="wait_text">{wait.text}</h1>
      <img src={wait.img} alt="" className="wait_doc" />
      <Progressbar now={now} length={100} type="waiting" />
    </div>
  );
});

export default WaitResult;
