import React from "react";
import { CSSTransition } from "react-transition-group";

const Components = ({match, Component, atrributes, footerImg}) => {
    return (
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
    );
};

export default Components;