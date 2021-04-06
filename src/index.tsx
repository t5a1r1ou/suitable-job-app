import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import SWUpdateDialog from "./SWUpdateDialog";

// if (process.env.NODE_ENV !== "production") {
//   const { whyDidYouUpdate } = require("why-did-you-update");
//   whyDidYouUpdate(React);
// }

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  // @ts-ignore
  onUpdate: (registration) => {
    if (registration.waiting) {
      ReactDOM.render(
        <SWUpdateDialog registration={registration} />,
        document.querySelector(".SW-update-dialog")
      );
    }
  },
});
