import React, { useState, useEffect, memo, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";
import loadable from "@loadable/component";

import logoTitle from "./images/logo-title.png";
import logoLeft from "./images/logo-item_left.png";
import logoRight from "./images/logo-item_right.png";
import valuesImg from "./images/values.png";
import personalityImg from "./images/personality.png";
import laboLogo from "./images/labo-logo.png";
import footerImg from "./images/logo-footer.png";
import docValues from "./images/doctor1.png";
import docPersonality from "./images/doctor2.png";
import docWaiting from "./images/doctor3.png";
import docWaited from "./images/doctor4.png";
import resultTop from "./images/result.png";

import Constants from "./Constants";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const Start = loadable(() => import("./components/Start"));
const SectionTop = loadable(() => import("./components/SectionTop"));
const Board = loadable(() => import("./components/Board"));
const Form = loadable(() => import("./components/Form"));
const Result = loadable(() => import("./components/Result"));
const Routes = loadable(() => import("./components/Routes"));
const WaitResult = loadable(() => import("./components/WaitResult"));

const App = memo(() => {
  const {
    questionsLen,
    answersLen,
    valuesResults,
    personalityResults,
  } = Constants;
  const [vQuestions, setvQuestions] = useState([]);
  const [pQuestions, setpQuestions] = useState([]);
  const [vAnswers, setvAnswers] = useState(
    Array(questionsLen["vQuestions"]).fill(
      Array(answersLen["vQuestions"]).fill(0)
    )
  );
  const [pAnswers, setpAnswers] = useState(
    Array(questionsLen["pQuestions"]).fill(
      Array(answersLen["pQuestions"]).fill(0)
    )
  );

  useEffect(() => {
    const getvQuestions = () => {
      axios
        .get(process.env.REACT_APP_SJC_VQUESTIONS as string)
        .then((r) => {
          const datas = r.data.data;
          setvQuestions(datas);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getpQuestions = () => {
      axios
        .get(process.env.REACT_APP_SJC_PQUESTIONS as string)
        .then((r) => {
          const datas = r.data.data;
          setpQuestions(datas);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getvQuestions();
    getpQuestions();
  }, []);

  const checkAnswers = useCallback(
    (answers) => answers[0].every((ele: number) => ele === 0),
    []
  );

  const maxIndex: (arr: number[][]) => number = (arr) => {
    const sumArr = arr.reduce((acc, current) =>
      acc.map((a, i) => a + current[i])
    );
    const max = sumArr.reduce((a, b) => Math.max(a, b));
    const targetArr: number[] = [];
    sumArr.forEach((a, index) => {
      if (a === max) {
        targetArr.push(index);
      }
    });

    const [targetFirst] = targetArr;
    return targetArr.length === 1
      ? targetFirst
      : targetArr[Math.floor(Math.random() * targetArr.length)];
  };

  const sortedIndexs: (arr: number[][]) => number[] = (arr) => {
    let sumArr: number[] = arr.reduce((acc, current) =>
      acc.map((a, i) => a + current[i])
    );
    const targetArr: number[] = [];
    for (let n = 0; n < sumArr.length; n++) {
      const max: number = sumArr.reduce((a, b) => Math.max(a, b));
      const index: number = sumArr.findIndex((a) => a === max);
      targetArr.push(index);
      const tempArr: number[] = sumArr.slice();
      tempArr[index] = 0;
      sumArr = tempArr;
    }
    return targetArr;
  };

  const valuesResult = valuesResults[maxIndex(vAnswers)];

  const personalityResult = personalityResults.find((result) => {
    const personalityMax: number[] = sortedIndexs(pAnswers)
      .slice(0, 2)
      .sort((a, b) => a - b); // 順番無視するためにソート
    const array_equal = (a: number[], b: number[]) => {
      if (a.length !== b.length) return false;
      for (let i = 0, n = a.length; i < n; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    };
    return array_equal(result["arr"], personalityMax);
  });

  const validAnswers = checkAnswers([...pAnswers, ...vAnswers]);

  const secImg = {
    values: {
      title: valuesImg,
      titleAlt: "価値観診断タイトル",
      doc: docValues,
      docAlt: "博士（価値観）",
    },
    personality: {
      title: personalityImg,
      titleAlt: "性格診断タイトル",
      doc: docPersonality,
      docAlt: "博士（性格）",
    },
  };

  const topImg = {
    logoTitle: logoTitle,
    logoLeft: logoLeft,
    logoRight: logoRight,
  };

  const ROUTES = [
    {
      path: "/",
      Component: Start,
      attributes: {
        topImg: topImg,
      },
    },
    {
      path: "/values/top",
      Component: SectionTop,
      attributes: { type: "values", secImg: secImg },
    },
    {
      path: "/values/questions/:index",
      Component: Board,
      attributes: {
        questions: vQuestions,
        answers: vAnswers,
        setAnswers: setvAnswers,
        type: "values",
        secImg: secImg,
      },
    },
    {
      path: "/personality/top",
      Component: SectionTop,
      attributes: {
        type: "personality",
        secImg: secImg,
      },
    },
    {
      path: "/personality/questions/:index",
      Component: Board,
      attributes: {
        questions: pQuestions,
        answers: pAnswers,
        setAnswers: setpAnswers,
        type: "personality",
        secImg: secImg,
      },
    },
    {
      path: "/loading",
      Component: WaitResult,
      attributes: {
        docWaiting: docWaiting,
        docWaited: docWaited,
      },
    },
    {
      path: "/form",
      Component: Form,
      attributes: {
        validAnswers: validAnswers,
        valuesResult: valuesResult,
        personalityResult: personalityResult,
      },
    },
    {
      path: "/result",
      Component: Result,
      attributes: {
        validAnswers: validAnswers,
        valuesResult: valuesResult,
        personalityResult: personalityResult,
        setpAnswers: setpAnswers,
        setvAnswers: setvAnswers,
        resultTop: resultTop,
      },
    },
  ];

  return (
    <div className="page">
      <HelmetProvider>
        <div className="SW-update-dialog"></div>
        <header className="header">
          <img src={laboLogo} className="labo-logo" alt="日総ラボロゴ" />
        </header>
        <BrowserRouter>
          <div className="page__container">
            <Routes
              // @ts-ignore
              ROUTES={ROUTES}
              footerImg={footerImg}
            />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </div>
  );
});

export default App;
