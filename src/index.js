import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../src/board/cssFiles/bootstrap.min.css";
import "../src/board/cssFiles/css_for_board.css";
import * as serviceWorker from "./serviceWorker";
import Board from "./board/Board";

ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.register();
