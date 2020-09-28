import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";

import Start from "./components/Start";
import SectionTop from "./components/SectionTop";
import Board from "./components/Board";
import Form from "./components/Form";
import Result from "./components/Result";
import ErrorBoundary from "./components/ErrorBoundary";

import valuesImg from "./images/values.png";
import personalityImg from "./images/personality.png";
import laboLogo from "./images/labo-logo.png";
import footerImg from "./images/logo-footer.png";
import docValues from "./images/doctor1.png";
import docPersonality from "./images/doctor2.png";


axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const App = () => {

  const [vQuestions, setvQuestions] = useState([]);
  const [pQuestions, setpQuestions] = useState([]);
  const [vAnswers, setvAnswers] = useState(Array(5).fill([0,0,0,0]));
  const [pAnswers, setpAnswers] = useState(Array(25).fill([0,0,0,0,0,0]));

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

  const checkAnswers = answers => answers[0].every(ele => ele === 0);

  const secImg = {
    values: {
      "title": valuesImg,
      "titleAlt": "価値観診断タイトル",
      "doc": docValues,
      "docAlt": "博士（価値観）"
    },
    personality: {
      "title": personalityImg,
      "titleAlt": "性格診断タイトル",
      "doc": docPersonality,
      "docAlt": "博士（性格）"
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
    { path: "/personality/top", Component: SectionTop, atrributes: { 
      type: "personality",
      secImg: secImg,
      answers: [...vAnswers, ...pAnswers],
    } 
    },
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
        answers: [...pAnswers, ...vAnswers],
        checkAnswers: checkAnswers
      }
    },
    {
      path: "/result", Component: Result, atrributes: {
        vAnswers: vAnswers,
        pAnswers: pAnswers,
        setpAnswers: setpAnswers,
        setvAnswers: setvAnswers,
        checkAnswers: checkAnswers
      }
    },
  ];

  return (
      <HelmetProvider className="page">
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
                      <ErrorBoundary>
                        <Component {...atrributes} />
                      </ErrorBoundary>
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
      </HelmetProvider>
  );
}

export default App;
