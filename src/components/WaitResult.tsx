import React, { memo, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Progressbar from "./ProgressBar";

import docWaiting from "../images/doctor3.png";
import docWaited from "../images/doctor4.png";

const WaitResult: React.FC = memo(() => {
  const history = useHistory();
  const [complete, setComplete] = useState(false);
  const [now, setNow] = useState(0);
  const waitObj = {
    waiting: {
      img: docWaiting,
      alt: "結果計算中の博士",
      text: "結果計算中…",
    },
    waited: {
      img: docWaited,
      alt: "結果計算完了の博士",
      text: "結果計算完了！",
    },
  };
  const wait = complete ? waitObj["waited"] : waitObj["waiting"];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setNow((prevNow) => (prevNow >= 100 ? 100 : prevNow + 20));
    }, 800);
    setTimeout(() => {
      setComplete(true);
    }, 4000);
    setTimeout(() => {
      history.push("/result");
    }, 5000);
    return () => {
      clearInterval(progressTimer);
    };
  }, [history]);

  return (
    <div className="wait_box">
      <h1 className="wait_text">{wait.text}</h1>
      <img src={wait.img} alt={wait.alt} className="wait_doc" />
      <Progressbar now={now} length={100} type="waiting" />
    </div>
  );
});

export default WaitResult;
