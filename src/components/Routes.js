import React, { memo } from "react";
import { Route } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';

const Routes = memo(({ROUTES, footerImg}) => {
    const routes = ROUTES.map(({ path, Component, atrributes }) => (
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
                  <Component {...atrributes} />
                {/* </ErrorBoundary> */}
                  <img
                  src={footerImg}
                  alt="ロゴフッター"
                />
                </div>
              </CSSTransition>
            
          )}
        </Route>
      ));
    return routes;
});

export default Routes;