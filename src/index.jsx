import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./scss/main.css";
import { SettingsProvider } from "./context/SettingsContext";
import SessionLogout from "./SessionLogout";

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <SessionLogout>
        <App />
      </SessionLogout>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
