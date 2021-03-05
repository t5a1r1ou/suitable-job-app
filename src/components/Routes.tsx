import React, { memo } from "react";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import loadable from "@loadable/component";

import ErrorBoundary from "./ErrorBoundary";

const Start = loadable(() => import("./Start"));
const SectionTop = loadable(() => import("./SectionTop"));
const Board = loadable(() => import("./Board"));
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

const Routes: React.VFC<Props> = memo(({ footerImg }) => {
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
      },
    },
    {
      path: "/values/questions/:index",
      Component: Board,
      attributes: {
        type: "values",
      },
    },
    {
      path: "/personality/top",
      Component: SectionTop,
      attributes: {
        type: "personality",
      },
    },
    {
      path: "/personality/questions/:index",
      Component: Board,
      attributes: {
        type: "personality",
      },
    },
    {
      path: "/loading",
      Component: WaitResult,
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
          {({ match }: { match: any }) => (
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
                <img src={footerImg} alt="" />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </>
  );
});

export default Routes;
