import React, { memo } from "react";
import { HashRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import loadable from "@loadable/component";

import laboLogo from "./images/labo-logo.png";
import footerImg from "./images/logo-footer.png";

import AppContext from "./contexts/AppContext";

const Routes = loadable(() => import("./components/Routes"));

const App = memo(() => {
  return (
    <div className="page">
      <HelmetProvider>
        <div className="SW-update-dialog"></div>
        <header className="header">
          <img src={laboLogo} className="labo-logo" alt="日総ラボロゴ" />
        </header>
        <Router>
          <div className="page__container">
            <AppContext>
              <Routes
                // @ts-ignore
                footerImg={footerImg}
              />
            </AppContext>
          </div>
        </Router>
      </HelmetProvider>
    </div>
  );
});

export default App;
