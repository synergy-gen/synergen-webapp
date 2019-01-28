import React from "react";
import { render } from "react-dom";
import App from "./components/app";
import config from '@bradenhc/client-config';

config.files([
  "/assets/config/default.json",
  "/assets/config/local.json"
]);

const rootEl = document.getElementById("app");

render(<App />, rootEl);

if (module.hot) {
  module.hot.accept();
}
