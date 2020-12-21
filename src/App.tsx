import React, { useState, useEffect, memo } from "react";
import { HashRouter as Router } from "react-router-dom";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";
import loadable from "@loadable/component";

import { useCalcResults } from "./logic/useCalcResults";

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
  const { questionsLen, answersLen } = Constants;
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

  const [valuesResult, personalityResult] = useCalcResults(vAnswers, pAnswers);

  const checkAnswers = (answers: number[][]) =>
    answers[0].every((ele: number) => ele === 0);
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
        <Router>
          <div className="page__container">
            <Routes
              // @ts-ignore
              ROUTES={ROUTES}
              footerImg={footerImg}
            />
          </div>
        </Router>
      </HelmetProvider>
    </div>
  );
});

export default App;
