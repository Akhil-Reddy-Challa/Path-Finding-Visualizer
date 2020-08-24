import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Board from "./board/Board";

ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.register();
