import React, { memo } from "react";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import valuesImg from "../images/values.png";
import personalityImg from "../images/personality.png";
import docValues from "../images/doctor1.png";
import docPersonality from "../images/doctor2.png";

import loadable from "@loadable/component";

import ErrorBoundary from "./ErrorBoundary";

const Start = loadable(() => import("./Start"));
const SectionTop = loadable(() => import("./SectionTop"));
const Board = loadable(() => import("./Board"));
const Form = loadable(() => import("./Form"));
const Result = loadable(() => import("./Result"));
const WaitResult = loadable(() => import("./WaitResult"));

interface routeItems {
  path: string;
  Component: any;
  attributes?: {
    questions?: questionItems[];
    vAnswers?: any;
    pAnswers?: any;
    answers?: number[][];
    setAnswers?: any;
    type?: string;
    secImg?: any;
    docWaiting?: any;
    topImg?: any;
    docWaited?: any;
    valuesResult?: any;
    personalityResult?: any;
    setpAnswers?: any;
    setvAnswers?: any;
    resultTop?: any;
  };
}

interface questionItems {
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  countA: string;
  countB: string;
  id: number;
  image_url?: string;
  title: string;
}

interface Props {
  footerImg: any;
}

const Routes: React.FC<Props> = memo(({ footerImg }) => {
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

  const ROUTES: routeItems[] = [
    {
      path: "/",
      Component: Start,
    },
    {
      path: "/values/top",
      Component: SectionTop,
      attributes: {
        type: "values",
        secImg: secImg,
      },
    },
    {
      path: "/values/questions/:index",
      Component: Board,
      attributes: {
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
        type: "personality",
        secImg: secImg,
      },
    },
    {
      path: "/loading",
      Component: WaitResult,
    },
    {
      path: "/form",
      Component: Form,
    },
    {
      path: "/result",
      Component: Result,
    },
  ];
  return (
    <>
      {ROUTES.map(({ path, Component, attributes }) => (
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
                  <Component {...attributes} />
                </ErrorBoundary>
                <img src={footerImg} alt="ロゴフッター" />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </>
  );
});

export default Routes;
