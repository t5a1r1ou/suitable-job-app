import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Start from "./components/Start";
import SectionTop from "./components/SectionTop";
import Board from "./components/Board";
import Form from "./components/Form";
import Result from "./components/Result";
import axios from "axios";

import valuesImg from "./images/values.png";
import personalityImg from "./images/personality.png";
import laboLogo from "./images/labo-logo.png";
import footerImg from "./images/logo-footer.png";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const App = () => {

  const [vQuestions, setvQuestions] = useState([]);
  const [pQuestions, setpQuestions] = useState([]);
  const [vAnswers, setvAnswers] = useState(Array(4).fill(0));
  const [pAnswers, setpAnswers] = useState(Array(6).fill(0));

  useEffect(() => {
    const getvQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_VQUESTIONS)
        .then(r => {
          const datas = r.data.data;
          setvQuestions(datas);
        }).catch(err => {
          console.log(err);
        });
    };

    const getpQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_PQUESTIONS)
        .then(r => {
          const datas = r.data.data;
          setpQuestions(datas);
        }).catch(err => {
          console.log(err);
        });
    };

    getvQuestions();
    getpQuestions();

  }, []);


  const maxIndexs = arr => {
    const max = arr.reduce((a, b) => Math.max(a, b));
    let targetArr = [];
    arr.forEach((a, index) => {
      if (a === max) {
        targetArr.push(index);
      };
    });
    return targetArr;
  };

  const valuesMax = maxIndexs(vAnswers);
  const personalityMax = maxIndexs(pAnswers);

  const secImg = {
    values: {
      "path": valuesImg,
      "alt": "価値観診断タイトル"
    },
    personality: {
      "path": personalityImg,
      "alt": "性格診断タイトル"
    }
  };

  const ROUTES = [
    { path: "/", Component: Start },
    { path: "/values/top", Component: SectionTop, atrributes: { type: "values", secImg: secImg } },
    {
      path: "/values/questions/:index", Component: Board, atrributes: {
        questions: vQuestions,
        answers: vAnswers,
        setAnswers: setvAnswers,
        type: "values",
        secImg: secImg
      }
    },
    { path: "/personality/top", Component: SectionTop, atrributes: { type: "personality", secImg: secImg } },
    {
      path: "/personality/questions/:index", Component: Board, atrributes: {
        questions: pQuestions,
        answers: pAnswers,
        setAnswers: setpAnswers,
        type: "personality",
        secImg: secImg
      }
    },
    {
      path: "/form", Component: Form, atrributes: {
        answers: [...pAnswers, ...vAnswers]
      }
    },
    {
      path: "/result", Component: Result, atrributes: {
        valuesMax: valuesMax,
        personalityMax: personalityMax,
        setpAnswers: setpAnswers,
        setvAnswers: setvAnswers,
      }
    },
  ];

  return (
    <div className="page">
      <header className="header">
        <img
          src={laboLogo}
          className="labo-logo"
          alt="日総ラボロゴ"
          />
      </header>
      <BrowserRouter>
        <div className="page__container">
          {ROUTES.map(({ path, Component, atrributes }) => (
            <Route key={path} path={path} exact>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={550}
                  classNames="page__item-"
                  unmountOnExit
                >
                  <div className="page__item base_box">
                    <Component {...atrributes} />
                    <img
                    src={footerImg}
                    alt="ロゴフッター"
                  />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
