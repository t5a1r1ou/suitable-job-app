import React, { memo } from "react";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

// import ErrorBoundary from "./ErrorBoundary";

interface routeItems {
  path: string;
  Component: any;
  attributes?: {
    questions: any;
    vAnswers: any;
    pAnswers: any;
    answers: number[];
    setAnswers: any;
    type: string;
    secImg: any;
  };
}

interface Props {
  ROUTES: routeItems[];
  footerImg: any;
}

const Routes: React.FC<Props> = memo(({ ROUTES, footerImg }) => {
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
                {/* <ErrorBoundary> */}
                <Component {...attributes} />
                {/* </ErrorBoundary> */}
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
