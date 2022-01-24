import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./axios-config";

import App from "./App";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
